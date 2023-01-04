import Web3 from "web3";
import secp256k1 from "secp256k1";
import keccak256 from "keccak256";


/**
 * @dev The value passed as the message parameter will be UTF-8 HEX decoded and wrapped as follows:
 * "\x19Ethereum Signed Message:\n" + message.length + message
 * 
 * see [EIP-191](https://eips.ethereum.org/EIPS/eip-191)
 * 
 * @param message The message to sign.
 * @param privateKey The private key to sign with.
 * @returns The signature using secp256k1.
 */
export function signMessage(message: string, privateKey: string): string {
    return new Web3().eth.accounts.sign(message, privateKey).signature;
}

/**
 * @dev Return the ethereum signable messages from EIP-191
 * 
 * see [EIP-191](https://eips.ethereum.org/EIPS/eip-191)
 * 
 * @param message The message to encode.
 * @returns keccak256("\x19Ethereum Signed Message:\n" + message.length + message)
 */
export function encodeMessage(message: string): string {
    return "0x" + keccak256(
        "\x19Ethereum Signed Message:\n"
        + message.length.toString()
        + message
    ).toString("hex");
}

/**
 * @dev Sign the message using secp256k1
 * 
 * @param hashedMessage The encoded message to sign.
 * @param privateKey The private key to sign with.
 * @returns The signature using secp256k1.
 */
export function sign(hashedMessage: string, privateKey: string): string {
    const vrs = secp256k1.ecdsaSign(
        Uint8Array.from(Buffer.from(hashedMessage.replace("0x", ""), 'hex')), 
        Uint8Array.from(Buffer.from(privateKey.replace("0x", ""), 'hex'))
    );
    
    /**
     * @dev v is `recovery identifier`, 
     * 
     * see [Ethereum yellow paper](https://ethereum.github.io/yellowpaper/paper.pdf) Appendix F.
     */
    const v = 27 + vrs.recid;

    return "0x" + Buffer.from(
        vrs.signature
    ).toString('hex') + v.toString(16);
}