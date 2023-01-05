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
export function hashTypedData(typedData: TypedMessage<MessageTypes>): string {
    return "0x" + TypedDataUtils.eip712Hash(typedData, SignTypedDataVersion.V4).toString("hex");
}

/**
 * @dev Return the "\x19\x01" + domainSeparator + hashStruct(message)
 * 
 * see [EIP-712](https://eips.ethereum.org/EIPS/eip-712)
 * 
 * @param typedData The typed data to encode.
 * @returns EIP-712 encoded message.
 */
export function encodeTypeData(typedData: TypedMessage<MessageTypes>): string {
    //The encoding is compliant with EIP-191. The ‘version byte’ is fixed to 0x01
    const prefix = "1901";

    const domainSeparator = TypedDataUtils.hashStruct(
        'EIP712Domain', 
        typedData.domain, 
        typedData.types, 
        SignTypedDataVersion.V4
    ).toString("hex");

    const hashStruct = TypedDataUtils.hashStruct(
        typedData.primaryType as string, 
        typedData.message, 
        typedData.types, 
        SignTypedDataVersion.V4
    ).toString("hex");

    return "0x" + prefix + domainSeparator + hashStruct;
}
