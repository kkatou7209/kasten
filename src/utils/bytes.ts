/**
 * Type of bytes-like source
 */
export type ByteSource =
    Uint8Array |
    Uint16Array |
    Uint32Array |
    Uint8ClampedArray |
    string;

export const textEncoder = new TextEncoder();
export const textDecoder = new TextDecoder();


/**
 * Checks given data byte like source.
 */
export const isByteSource = (source: ByteSource): boolean => {

    return source instanceof Uint8Array
        || source instanceof Uint16Array
        || source instanceof Uint32Array
        || source instanceof Uint8ClampedArray
        || typeof source === 'string';
}

/**
 * Converts to source to bytes.
 */
export const toBytes = (source: ByteSource): Uint8Array => {
    return typeof source === 'string'
        ? textEncoder.encode(source)
        : new Uint8Array(
            source.buffer,
            source.byteOffset,
            source.byteLength
          );
}

/**
 * Converts source to string.
 */
export const toStr = (source: ByteSource): string => {

    return typeof source === 'string'
        ? source
        : textDecoder.decode(source);

}
