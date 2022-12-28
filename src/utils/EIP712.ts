import { 
    signTypedData, 
    SignTypedDataVersion, 
    TypedMessage, 
    MessageTypes 
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
export function signTypedDataV4(data: TypedMessage<MessageTypes>, privateKey: Buffer): string {
    return signTypedData({
        privateKey,
        data,
        version: SignTypedDataVersion.V4
    });
}