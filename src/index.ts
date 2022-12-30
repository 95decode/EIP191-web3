import { signMessage } from "./utils/EIP191";
import { signTypedDataV4 } from "./utils/EIP712";

// for test
const wallet = {
    address: "0xB984E64a321D837466F2CC48cd0B7F8603e6cF25",
    privateKey: "0x55e51eb0338cd822dcd621fc23699df1a6ee637d23e604ceaaf75fe07d4ee595"
}

//////////////////////////////////////////////////////////////////////////////////////////

// see `https://eips.ethereum.org/EIPS/eip-191`

const message = "Example message";

console.log("EIP191 signature :", signMessage(message, wallet.privateKey));

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

console.log("EIP712 signature :", signTypedDataV4(typedData, wallet.privateKey));

//////////////////////////////////////////////////////////////////////////////////////////
