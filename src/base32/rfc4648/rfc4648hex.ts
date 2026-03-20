import { Base32 } from '@/base32';
import { CharCodes } from '@/char-codes';
import { KastenBase32DecodeError } from '@/base32/errors';

export class RFC4648Base32Hex extends Base32 {

    private static readonly PADDING_CHAR_CODE: number = '='.charCodeAt(0);

    private static readonly TABLE: string
        = '0123456789ABCDEFGHIJKLMNOPQRSTUV';

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

    public override ecode(bytes: Uint8Array): string {

        const ENCODED_TABLE = RFC4648Base32Hex.ENCODED_TABLE;

        const chars = new Uint8Array(Math.ceil(bytes.length / 5) * 8);

        let count = 0;

        for (let i = 0; i < bytes.length; i += 5) {

            const b1 = bytes[i]!;
            const b2 = bytes[i + 1] ?? 0;
            const b3 = bytes[i + 2] ?? 0;
            const b4 = bytes[i + 3] ?? 0;
            const b5 = bytes[i + 4] ?? 0;

            const ci1 = (b1 & 0xFF) >> 3;
            const ci2 = ((b1 & 0x07) << 2) | ((b2 & 0xC0) >> 6);
            const ci3 = (b2 & 0x3E) >> 1;
            const ci4 = ((b2 & 0x01) << 4) | ((b3 & 0xF0) >> 4);
            const ci5 = ((b3 & 0x0F) << 1) | ((b4 & 0x80) >> 7);
            const ci6 = (b4 & 0x7C) >> 2;
            const ci7 = ((b4 & 0x03) << 3) | ((b5 & 0xE0) >> 5);
            const ci8 = b5 & 0x1F;

            const c1 = ENCODED_TABLE[ci1]!;
            const c2 = ENCODED_TABLE[ci2]!;
            const c3 = ENCODED_TABLE[ci3]!;
            const c4 = ENCODED_TABLE[ci4]!;
            const c5 = ENCODED_TABLE[ci5]!;
            const c6 = ENCODED_TABLE[ci6]!;
            const c7 = ENCODED_TABLE[ci7]!;
            const c8 = ENCODED_TABLE[ci8]!;

            chars[count++] = c1;
            chars[count++] = c2;
            chars[count++] = c3;
            chars[count++] = c4;
            chars[count++] = c5;
            chars[count++] = c6;
            chars[count++] = c7;
            chars[count++] = c8;
        }

        const remain = bytes.length % 5;

        const padding =
            remain === 4 ? 1 :
            remain === 3 ? 3 :
            remain === 2 ? 4 :
            remain === 1 ? 6 : 0;

        for (let i = padding; i > 0; i--) {
            chars[count - i] = RFC4648Base32Hex.PADDING_CHAR_CODE;
        }

        return Base32.textDecoder.decode(chars.subarray(0, count));
    }
    
    public override decode(base32: string): Uint8Array {

        const upper = base32.toUpperCase();

        const DECODED_TABLE = RFC4648Base32Hex.DECODED_TABLE;
        const PADDING = RFC4648Base32Hex.PADDING_CHAR_CODE;
        const { CR, LF, SP, HT } = CharCodes;

        const chars = new Uint8Array(base32.length);

        let charCount = 0;

        for (let i = 0; i < base32.length; i++) {

            const c = upper.charCodeAt(i);

            if (c !== CR &&
                c !== LF &&
                c !== SP &&
                c !== HT) {

                chars[charCount++] = c;
            }
        }

        if (charCount % 8 !== 0)
            throw new KastenBase32DecodeError('Invalid length string.');

        let firstPad = -1;

        for (let i = 0; i < charCount; i++) {
            if (chars[i] === PADDING) {
                firstPad = i;
                break;
            }
        }

        let padCount = 0;

        if (firstPad !== -1) {

            if (firstPad < charCount - 6)
                throw new KastenBase32DecodeError('Invalid padding position.');

            for (let i = firstPad; i < charCount; i++) {
                if (chars[i] !== PADDING) {
                    throw new KastenBase32DecodeError('Invalid padding');
                }
            }

            padCount = charCount - firstPad;

            if (padCount !== 1 && padCount !== 3 && padCount !== 4 && padCount !== 6) {
                throw new KastenBase32DecodeError('Invalid padding');
            }
        }

        const bytes = new Uint8Array(Math.floor(((charCount - padCount) * 5) / 8));

        let byteCount = 0;

        for (let i = 0; i < charCount; i += 8) {

            const c1 = chars[i]!;
            const c2 = chars[i + 1]!;
            const c3 = chars[i + 2]!;
            const c4 = chars[i + 3]!;
            const c5 = chars[i + 4]!;
            const c6 = chars[i + 5]!;
            const c7 = chars[i + 6]!;
            const c8 = chars[i + 7]!;

            const ci1 = DECODED_TABLE[c1]!;
            const ci2 = DECODED_TABLE[c2]!;
            const ci3 = c3 !== PADDING ? DECODED_TABLE[c3]! : 0;
            const ci4 = c4 !== PADDING ? DECODED_TABLE[c4]! : 0;
            const ci5 = c5 !== PADDING ? DECODED_TABLE[c5]! : 0;
            const ci6 = c6 !== PADDING ? DECODED_TABLE[c6]! : 0;
            const ci7 = c7 !== PADDING ? DECODED_TABLE[c7]! : 0;
            const ci8 = c8 !== PADDING ? DECODED_TABLE[c8]! : 0;

            if (ci1 === 255 ||
                ci2 === 255 ||
                ci3 === 255 ||
                ci4 === 255 ||
                ci5 === 255 ||
                ci6 === 255 ||
                ci7 === 255 ||
                ci8 === 255) {

                throw new KastenBase32DecodeError('Invalid Base32');
            }

            const b1 = ((ci1 & 0x1F) << 3) | ((ci2 & 0x1C) >> 2);
            const b2 = ((ci2 & 0x03) << 6) | ((ci3 & 0x1F) << 1) | ((ci4 & 0x10) >> 4);
            const b3 = ((ci4 & 0x0F) << 4) | ((ci5 & 0x1E) >> 1);
            const b4 = ((ci5 & 0x01) << 7) | ((ci6 & 0x1F) << 2) | ((ci7 & 0x18) >> 3);
            const b5 = ((ci7 & 0x07) << 5) | (ci8 & 0x1F);

            bytes[byteCount++] = b1;

            if (byteCount < bytes.length)
                bytes[byteCount++] = b2;

            if (byteCount < bytes.length)
                bytes[byteCount++] = b3;

            if (byteCount < bytes.length && c5 !== PADDING)
                bytes[byteCount++] = b4;

            if (byteCount < bytes.length && c7 != PADDING)
                bytes[byteCount++] = b5;
        }

        return bytes.subarray(0, byteCount);
    }
}