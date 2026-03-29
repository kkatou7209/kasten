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
import type { Base85, Base85Category } from './base85';
import { Ascii85 } from './base85/ascii85/ascii85';

/**
 * Codec functory.
 */
export class Codecs {

    /**
     * Creates Base64 codec instance.
     * @param category Base64 category.
     */
    public base64 = (category?: Base64Category): Base64 => {

        switch(category) {
            case 'rfc-4648-url':
                return new RFC4648Base64URL();
            case 'rfc-2025':
                return new RFC2045Base64();
            case 'rfc-4648':
            default:
                return new RFC4648Base64();
        }
    }

    /**
     * Creates Base32 codec instance.
     * @param category Base32 category.
     */
    public base32 = (category?: Base32Category): Base32 => {

        switch(category) {
            case 'rfc-468-hex':
                return new RFC4648Base32Hex();
            case 'rfc-4648':
            default:
                return new RFC4648Base32();
        }
    }

    /**
     * Create Base16 codec instance.
     * @param category Category of Base16
     */
    public base16 = (category?: Base16Category): Base16 => {

        switch(category) {
            case 'ascii-hex':
                return new AsciiHexDecode();
            case 'rfc-4648':
            default:
                return new RFC4648Base16();
        }
    }

    /**
     * Creates Base85 codec instance.
     * @param category Category of Base85
     */
    public base85 = (category?: Base85Category): Base85 => {
        switch(category) {
            case 'ascii-85':
            default:
                return new Ascii85();
        }
    }
}