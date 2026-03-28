import { Codecs } from '@/codecs';
import { Compressors } from '@/compressors';

/**
 * Entry point of the Kasten library.
 * All encoding/decoding feature implementations are created through this class.
 *
 * @example
 * const base64 = Kasten.base64('rfc4648');
 * const encoded = base64.encode(data);
 *
 * @example
 * const base32 = Kasten.base32('rfc464hex');
 * const decoded = base32.decode(text);
 *
 * @example
 * const base16 = Kasten.base16();
 *
 * @example
 * const runLength = Kasten.runLength('pack-bits');
 */
export class Kasten {

    private constructor() {}

    /**
     * Gets codec functory.
     */
    public static get codecs() {
        return new Codecs();
    }

    public static get compressors() {
        return new Compressors();
    }
}