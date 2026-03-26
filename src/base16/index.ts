export const Base16Categories = ['rfc4648', 'ascii'] as const;

export type Base16Category = typeof Base16Categories[number];

/**
 * Base16 codec.
 */
export abstract class Base16 {

    /**
     * Encodes bytes to Base16 string.
     * @param bytes Bytes to be encoded.
     */
    public abstract encode(bytes: Uint8Array): string;

    /**
     * Decodes Base16 string to bytes.
     * @param base16 Base16 string to be decoded.
     */
    public abstract decode(base16: string): Uint8Array;
}