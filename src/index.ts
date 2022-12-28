import { signMessage } from "./utils/EIP191";
import { signTypedDataV4 } from "./utils/EIP712";
import types from "./libs/signTypedData";

// for test
const wallet = {
    address: "0xB984E64a321D837466F2CC48cd0B7F8603e6cF25",
    privateKey: "55e51eb0338cd822dcd621fc23699df1a6ee637d23e604ceaaf75fe07d4ee595"
}

//////////////////////////////////////////////////////////////////////////////////////////

// see `https://eips.ethereum.org/EIPS/eip-191`

const message = "Example message";

console.log("EIP191 : ", signMessage(message, wallet.privateKey));

//////////////////////////////////////////////////////////////////////////////////////////

// see `https://eips.ethereum.org/EIPS/eip-712`

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

console.log("EIP712 : ", signTypedDataV4(typedData, Buffer.from(wallet.privateKey, 'hex')));

//////////////////////////////////////////////////////////////////////////////////////////
