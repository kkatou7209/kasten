export type Base64Catgory = 'rfc4648' | 'rfc4648-url' | 'rfc2025';

/**
 * Base64 codec.
 */
export abstract class Base64 {

    /**
     * Encodes byte array to string.
     */
    public abstract encode(bytes: Uint8Array): string;

    /**
     * Decodes string to byte array.
     * @param base64 Base64 string
     */
    public abstract decode(base64: string): Uint8Array;
}