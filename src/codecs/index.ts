import type { Base16, Base16Category } from '@/codecs/base16';
import type { Base32, Base32Category } from '@/codecs/base32';
import type { Base64, Base64Category } from '@/codecs/base64';
import { RFC4648Base16 } from '@/codecs/base16/rfc4648/rfc4648';
import { AsciiHexDecode } from '@/codecs/base16/ascii/ascii';
import { RFC4648Base32 } from '@/codecs/base32/rfc4648/rfc4648';
import { RFC4648Base32Hex } from '@/codecs/base32/rfc4648/rfc4648hex';
import { RFC2045Base64 } from '@/codecs/base64/rfc2045/rfc2045';
import { RFC4648Base64 } from '@/codecs/base64/rfc4648/rfc4648';
import { RFC4648Base64URL } from '@/codecs/base64/rfc4648/rfc4648url';

/**
 * Codec functory.
 */
export class Codecs {

    /**
     * Creates Base 64 codec instance.
     * @param category Base 64 category.
     */
    public base64 = (category?: Base64Category): Base64 => {

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
    public base32 = (category?: Base32Category): Base32 => {

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
    public base16 = (category?: Base16Category): Base16 => {

        switch(category) {
            case 'ascii':
                return new AsciiHexDecode();
            case 'rfc4648':
            default:
                return new RFC4648Base16();
        }
    }
}