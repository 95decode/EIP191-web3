import RLP from 'rlp'

export function encodeHexString(hexString: string): string {
    return "0x" + Buffer.from(
        RLP.encode(
            Uint8Array.from(
                Buffer.from(hexString.replace("0x", ""), 'hex')
            )
        )
    ).toString("hex");
}

export function decodeHexString(hexString: string): string {
    return "0x" + Buffer.from(
        RLP.decode(
            Uint8Array.from(
                Buffer.from(hexString.replace("0x", ""), 'hex')
            )
        ) as Uint8Array
    ).toString("hex");
}

export function stringToHexString(message: string): string {
    return "0x" + Buffer.from(message).toString("hex");
}
