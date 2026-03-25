import type { Base16, Base16Category } from '@/base16';
import type { Base32, Base32Category } from '@/base32';
import type { Base64, Base64Category } from '@/base64';
import type { RunLength, RunLengthCatgory } from '@/run-length';
import { RFC4648Base16 } from '@/base16/rfc4648/rfc4648';
import { RFC4648Base32 } from '@/base32/rfc4648/rfc4648';
import { RFC4648Base32Hex } from '@/base32/rfc4648/rfc4648hex';
import { RFC2045Base64 } from '@/base64/rfc2045/rfc2045';
import { RFC4648Base64 } from '@/base64/rfc4648/rfc4648';
import { RFC4648Base64URL } from '@/base64/rfc4648/rfc4648url';
import { BasicRunLength } from '@/run-length/basic/basic-run-length';
import { PackBits } from '@/run-length/pack-bits/pack-bits';
import { Pdf } from '@/run-length/pdf/pdf';

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
class Kasten {

    private constructor() {}

    /**
     * Creates Base 64 codec instance.
     * @param category Base 64 category.
     */
    public static base64 = (category?: Base64Category): Base64 => {

        switch(category) {
            case 'rfc4648-url':
                return new RFC4648Base64URL();
            case 'rfc2025':
                return new RFC2045Base64();
            case 'rfc4648':
            default:
                return new RFC4648Base64();
        }
    }

    /**
     * Creates Base 32 codec instance.
     * @param category Base 32 category.
     */
    public static base32 = (category?: Base32Category): Base32 => {

        switch(category) {
            case 'rfc468-hex':
                return new RFC4648Base32Hex();
            case 'rfc4648':
            default:
                return new RFC4648Base32();
        }
    }

    /**
     * Create Base 16 codec instance.
     */
    public static base16 = (category?: Base16Category): Base16 => {

        switch(category) {
            case 'rfc4648':
            default:
                return new RFC4648Base16();
        }
    }

    /**
     * Creates Run-Length codec instance.
     */
    public static runLength = (category?: RunLengthCatgory): RunLength => {

        switch(category) {
            case 'pack-bits':
                return new PackBits();
            case 'pdf':
                return new Pdf();
            case 'basic':
            default:
                return new BasicRunLength();
        }
    }
}

export {
    Kasten,
    type Base64,
    type Base64Category as Base64Catgory,
    type Base32,
    type Base32Category,
    type Base16,
    type Base16Category,
    type RunLength,
    type RunLengthCatgory
}