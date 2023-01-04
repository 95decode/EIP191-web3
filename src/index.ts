import { encodeMessage, signMessage, sign } from "./utils/EIP191";
import { signTypedDataV4 } from "./utils/EIP712";

// for test
const wallet = {
    address: "0xeA944df16acF918829BE37bFE7071879B25f536b",
    privateKey: "0x78b6bca7adcc4bf1ab2c016aecde10048d54d3981919ade69b8378d3aed58e5c"
}

//////////////////////////////////////////////////////////////////////////////////////////

// see `https://eips.ethereum.org/EIPS/eip-191`

const message = "sample message";
const hashedMessage = encodeMessage(message);

console.log("Original message string      :", message);
console.log("EIP191 encoded message       :", hashedMessage);
console.log("EIP191 signature(secp256k1)  :", sign(hashedMessage, wallet.privateKey));
console.log("EIP191 signature( web3.js )  :", signMessage(message, wallet.privateKey));

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

console.log("EIP712 signature(ethSigUtil) :", signTypedDataV4(typedData, wallet.privateKey));

//////////////////////////////////////////////////////////////////////////////////////////
