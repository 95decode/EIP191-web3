import Web3 from "web3";

/**
 * @dev The value passed as the message parameter will be UTF-8 HEX decoded and wrapped as follows:
 * "\x19Ethereum Signed Message:\n" + message.length + message
 * 
 * see [EIP-191](https://eips.ethereum.org/EIPS/eip-191)
 * 
 * @param message The message to sign.
 * @param privateKey The private key to sign with.
 * @returns The raw RLP encoded signature.
 */
export function signMessage(message: string, privateKey: string): string {
    return new Web3().eth.accounts.sign(message, privateKey).signature;
}