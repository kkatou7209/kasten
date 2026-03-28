import { isByteSource, toBytes, toStr, type ByteSource } from '@/utils/bytes';
import { KastenBase64DecodeError, KastenBase64EncodeError } from '@/codecs/base64/errors';
import { KastenError } from '@/errors';

/**
 * Codec common implementation.
 */
export abstract class Codec {

    /**
     * Encodes data.
     */
    public encode = (bytes: ByteSource): string => {

        if (!isByteSource(bytes))
            throw new KastenError('Given data can not be handled as bytes');

        return this.encodeBytes(toBytes(bytes));
    }

    /**
     * Decodes data.
     */
    public decode = (base64: ByteSource): Uint8Array => {

        if (!isByteSource(base64))
            throw new KastenError('Given data can not be handled as string');

        return this.decodeString(toStr(base64));
    }

    /**
     * Encodes byte array to string.
     */
    public abstract encodeBytes(bytes: Uint8Array): string;

    /**
     * Decodes string to byte array.
     * @param base64 Base64 string
     */
    public abstract decodeString(base64: string): Uint8Array;
}