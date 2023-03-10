//import { ethers } from "ethers";
import keccak256 from "keccak256";
import { 
    encodeMessage, 
    signMessage, 
    sign, 
    encodeMessageKlaytn
} from "./utils/EIP191";
import { 
    signTypedDataV4, 
    hashTypedData, 
    encodeTypeData 
} from "./utils/EIP712";
import { 
    encodeHexString,
    decodeHexString,
    stringToHexString
} from "./utils/rlp";

// for test
const wallet = {
    address: "0xeA944df16acF918829BE37bFE7071879B25f536b",
    privateKey: "0x78b6bca7adcc4bf1ab2c016aecde10048d54d3981919ade69b8378d3aed58e5c"
}

//////////////////////////////////////////////////////////////////////////////////////////

// see `https://eips.ethereum.org/EIPS/eip-191`

const message = "hello world";

const hashedMessage = encodeMessage(message);
const klaytnMessage = encodeMessageKlaytn(message);

//console.log("Original message string           :", message);
console.log("Hashed EIP191 message             :", hashedMessage);
console.log("EIP191 signature(secp256k1)       :", sign(hashedMessage, wallet.privateKey));
console.log("EIP191 signature(web3.js)         :", signMessage(message, wallet.privateKey));
console.log("Klaytn                            :", sign(klaytnMessage, wallet.privateKey));

//////////////////////////////////////////////////////////////////////////////////////////

// see `https://eips.ethereum.org/EIPS/eip-712`

/*

Typed Data json-schema

{
    type: 'object',
    properties: {
        types: {
            type: 'object',
            properties: {
                EIP712Domain: {type: 'array'},
            },
            additionalProperties: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        name: {type: 'string'},
                        type: {type: 'string'}
                    },
                    required: ['name', 'type']
                }
            },
            required: ['EIP712Domain']
        },
        primaryType: {type: 'string'},
        domain: {type: 'object'},
        message: {type: 'object'}
    },
    required: ['types', 'primaryType', 'domain', 'message']
}

*/

// sample typed data

const types = {
    EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
    ],
    MainType: [
        { name: "SubTypeAKey", type: "SubTypeA" },
        { name: "SubTypeBKey", type: "SubTypeB[]" },
    ],
    SubTypeA: [
        { name: "stringKey", type: "string" },
        { name: "addressKey", type: "address" },
    ],
    SubTypeB: [
        { name: "uint256Key", type: "uint256" },
        { name: "addressKey", type: "address" },
    ],
};

const domain = {
    name: 'Example name',
    version: '1',
    chainId: 5,
    verifyingContract: wallet.address
};

const data = {
    SubTypeAKey: {
        stringKey: "testString",
        addressKey: wallet.address
    },
    SubTypeBKey: [
        { uint256Key: 100, addressKey: wallet.address },
        { uint256Key: 200, addressKey: wallet.address }
    ]
}

const typedData = {
    types: types,
    domain: domain,
    primaryType: 'MainType',
    message: data
}

const encoded = encodeTypeData(typedData);
const hashedData = hashTypedData(typedData);

//console.log("\nOriginal typed data               :\n", typedData);
console.log(" ");
console.log("EIP712 hashed typedData(indirect) :", "0x" + keccak256(encoded).toString("hex"));
console.log("EIP712 hashed typedData(direct)   :", hashedData);
console.log("EIP191 signature(secp256k1)       :", sign(hashedData, wallet.privateKey))
console.log("EIP191 signature(ethSigUtil)      :", signTypedDataV4(typedData, wallet.privateKey));

//////////////////////////////////////////////////////////////////////////////////////////

const hexString = stringToHexString(message);
const rlpEncoded = encodeHexString(hexString);
const rlpDecoded = decodeHexString(rlpEncoded);

console.log(" ");
console.log("original message    :", hexString);
console.log("RLP encoded message :", rlpEncoded);
console.log("RLP decoded message :", rlpDecoded);

/*

const unsignedTx = {
    type: 0,
    to: "0x00000000879Cd60de9fEaC82452cead7a07E18df",
    value: 1,
    gasPrice: 10000000,
    gasLimit: 21000,
    nonce: 5,
    chainId: 5,
    data: "0x00"
}

const serializedTx = ethers.utils.serializeTransaction(unsignedTx).slice(2);

console.log(serializedTx);

*/