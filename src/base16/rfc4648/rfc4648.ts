import { Base16 } from '@/base16';
import { CharCodes } from '@/utils/char-codes';
import { KastenBase16DecodeError } from '../errors';

/**
 * RFC 4648 Base 16 encoding.
 */
export class RFC4648Base16 extends Base16 {

    private static readonly textDecoder = new TextDecoder();

    private static readonly TABLE = '0123456789ABCDEF';

    private static readonly ENCODED_TABLE = new Uint8Array(
        [...this.TABLE].map(c => c.charCodeAt(0))
    );

    private static readonly DECODED_TABLE = new Uint8Array(256);

    static {
        this.DECODED_TABLE.fill(255);

        for (let i = 0; i < this.TABLE.length; i++) {
            this.DECODED_TABLE[this.TABLE.charCodeAt(i)] = i;
        }
    }

    public override encode(bytes: Uint8Array): string {

        const ENCODED_TABLE = RFC4648Base16.ENCODED_TABLE;

        const chars = new Uint8Array(bytes.length * 2);

        let charCount = 0;

        for (const byte of bytes) {
            
            const ci1 = (byte & 0xF0) >> 4;
            const ci2 = byte & 0x0F;

            const c1 = ENCODED_TABLE[ci1]!;
            const c2 = ENCODED_TABLE[ci2]!;

            chars[charCount++] = c1;
            chars[charCount++] = c2;
        }

        return RFC4648Base16.textDecoder.decode(chars);
    }
    
    public override decode(base16: string): Uint8Array {

        const DECODED_TABLE = RFC4648Base16.DECODED_TABLE;

        const upper = base16.toUpperCase();
        const chars = new Uint8Array(base16.length);

        let charCount = 0;

        for (let i = 0; i < base16.length; i++) {
            const c = upper.charCodeAt(i);

            if (CharCodes.isWhitespace(c))
                continue;

            if (!DECODED_TABLE[c] || DECODED_TABLE[c] == 255)
                throw new KastenBase16DecodeError(`Invalid Base16 character: ${base16.charAt(i)}`);

            chars[charCount++] = c;
        }

        if (charCount % 2 !== 0)
            throw new KastenBase16DecodeError('Invalid Base16');

        const bytes = new Uint8Array(Math.ceil(base16.length / 2));

        let byteCount = 0;

        for (let i = 0; i < charCount; i += 2) {
            
            const c1 = chars[i]!;
            const c2 = chars[i + 1]!;

            const ci1 = DECODED_TABLE[c1]!;
            const ci2 = DECODED_TABLE[c2]!;

            const byte = ((ci1 & 0x0F) << 4) | (ci2 & 0x0F);

            bytes[byteCount++] = byte;
        }

        return bytes.subarray(0, byteCount);
    }
}