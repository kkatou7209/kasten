import { RFC4648Base16 } from './base16/rfc4648/rfc4648';
import { type Base32, type Base32Category } from './base32';
import { RFC4648Base32 } from './base32/rfc4648/rfc4648';
import { RFC4648Base32Hex } from './base32/rfc4648/rfc4648hex';
import { type Base64, type Base64Catgory } from './base64';
import { RFC2045Base64 } from './base64/rfc2045/rfc2045';
import { RFC4648Base64 } from './base64/rfc4648/rfc4648';
import { RFC4648Base64URL } from './base64/rfc4648/rfc4648url';
import type { RunLength, RunLengthCatgory } from './run-length';
import { BasicRunLength } from './run-length/basic/basic-run-length';

export class Casten {

    private constructor() {}

    /**
     * Creates Base 64 codec instance.
     * @param category Base 64 category.
     */
    public static base64 = (category?: Base64Catgory): Base64 => {

        switch(category) {
            case 'rfc4648':
                return new RFC4648Base64();
            case 'rfc4648-url':
                return new RFC4648Base64URL();
            case 'rfc2025':
                return new RFC2045Base64();
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
            case 'rfc4649':
                return new RFC4648Base32();
            case 'rfc464hex':
                return new RFC4648Base32Hex();
            default:
                return new RFC4648Base32();
        }
    }

    /**
     * Create Base 16 codec instance.
     */
    public static base16 = () => {
        return new RFC4648Base16();
    }

    public static runLength = (category?: RunLengthCatgory): RunLength => {

        switch(category) {
            case 'basic':
            default:
                return new BasicRunLength();
        }
    }
}