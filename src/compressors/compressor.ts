import { KastenError } from '@/errors';
import { isByteSource, toBytes, type ByteSource } from '@/utils/bytes';

/**
 * Compression implementations.
 */
export abstract class Compressor {

    public compress = (bytes: ByteSource): Uint8Array => {

        if (!isByteSource(bytes))
            throw new KastenError('Given data can not be handled as bytes');

        return this.compressBytes(toBytes(bytes));
    }

    public decompress = (bytes: ByteSource): Uint8Array => {

        if (!isByteSource(bytes))
            throw new KastenError('Given data can not be handled as bytes');

        return this.decompressBytes(toBytes(bytes));
    }

    protected abstract compressBytes(bytes: Uint8Array): Uint8Array;

    protected abstract decompressBytes(bytes: Uint8Array): Uint8Array;
}