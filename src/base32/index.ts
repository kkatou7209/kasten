export abstract class Base32 {

    protected static readonly textDecoder = new TextDecoder();

    /**
     * Encodes bytes to Base32 string
     * @param bytes Bytes to be encoded.
     */
    public abstract ecode(bytes: Uint8Array): string;

    /**
     * Decodes Base32 string to bytes.
     * @param base32 Base32 string to be decoded.
     */
    public abstract decode(base32: string): Uint8Array;
}