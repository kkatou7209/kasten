export const RunLengthCatgories = ['basic', 'pack-bits', 'pdf'] as const;

export type RunLengthCatgory = typeof RunLengthCatgories[number];

/**
 * Run-Length encoding and decoding.
 */
export abstract class RunLength {

    /**
     * Encodes bytes to Run-Length encoded bytes.
     * @param bytes 
     */
    public abstract encode(bytes: Uint8Array): Uint8Array;

    /**
     * Decodes Run-Length encoded bytes to original bytes.
     * @param runLength 
     */
    public abstract decode(runLength: Uint8Array): Uint8Array;
}