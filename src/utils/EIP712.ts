import { 
    signTypedData, 
    SignTypedDataVersion, 
    TypedMessage, 
    MessageTypes,
    TypedDataUtils
} from "@metamask/eth-sig-util";

/**
 * @dev Sign typed data according to EIP-712.
 * It includes full support of arrays and recursive data structures.
 * 
 * see [EIP-712](https://eips.ethereum.org/EIPS/eip-712)
 * 
 * @param data The typed data to sign.
 * @param privateKey The private key to sign with.
 * @returns The raw RLP encoded signature.
 */
export function signTypedDataV4(data: TypedMessage<MessageTypes>, privateKey: string): string {
    const buf = Buffer.from(privateKey.replace("0x", ""), 'hex');

    return signTypedData({
        privateKey: buf,
        data,
        version: SignTypedDataVersion.V4
    });
}

/**
 * @dev Return the ethereum signable messages from EIP-191.
 * 
 * see [EIP-191](https://eips.ethereum.org/EIPS/eip-191)
 * 
 * @param typedData The typed data to sign.
 * @returns EIP712 hashed data.
 */
export function encodeTypedData(typedData: TypedMessage<MessageTypes>): string {
    return "0x" + TypedDataUtils.eip712Hash(typedData, SignTypedDataVersion.V4).toString("hex");
}
