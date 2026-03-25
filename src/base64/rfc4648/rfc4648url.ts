import { CharCodes } from '@/char-codes';
import { KastenBase64DecodeError } from '@/base64/errors';
import { Base64 } from '@/base64';

export class RFC4648Base64URL extends Base64 {
    
    private static readonly PADDING_CHAR_CODE = '='.charCodeAt(0);

    private static readonly TABLE: string
        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

    private static readonly DECODE_TABLE = new Uint8Array(256);

    private static readonly ENCODE_TABLE = new Uint8Array(
        [...this.TABLE].map(c => c.charCodeAt(0))
    );

    private static readonly decoder = new TextDecoder();

    static {
    
        this.DECODE_TABLE.fill(255);

        for (let i = 0; i < this.TABLE.length; i++) {
            this.DECODE_TABLE[this.TABLE.charCodeAt(i)] = i;
        }
    }

    public override encode = (bytes: Uint8Array): string => {

        if (bytes.length === 0) return '';

        const ENCODE_TABLE = RFC4648Base64URL.ENCODE_TABLE;

        const baseSize = Math.ceil(bytes.length / 3) * 4;
        const linebreaks = Math.floor((baseSize - 1) / 76);

        const chars = new Uint8Array(baseSize + linebreaks * 2);

        let ci = 0;

        for (let i = 0; i < bytes.length; i += 3) {

            const b1 = bytes[i]!;
            const b2 = bytes[i + 1] ?? 0;
            const b3 = bytes[i + 2] ?? 0;

            const c1 = b1 >> 2;
            const c2 = ((b1 & 0b00000011) << 4) | b2 >> 4;
            const c3 = ((b2 & 0b00001111) << 2) | b3 >> 6;
            const c4 = b3 & 0b00111111;

            chars[ci++] = ENCODE_TABLE[c1]!;
            chars[ci++] = ENCODE_TABLE[c2]!;
            chars[ci++] = ENCODE_TABLE[c3]!;
            chars[ci++] = ENCODE_TABLE[c4]!;
        }

        const remain = bytes.length % 3;

        if (remain === 1) {
            chars[ci - 2] = RFC4648Base64URL.PADDING_CHAR_CODE;
            chars[ci - 1] = RFC4648Base64URL.PADDING_CHAR_CODE;
        } else if (remain === 2) {
            chars[ci - 1] = RFC4648Base64URL.PADDING_CHAR_CODE;
        }

        return RFC4648Base64URL.decoder.decode(chars.subarray(0, ci));
    }
    
    public override decode = (base64: string): Uint8Array => {

        const DECODE_TABLE = RFC4648Base64URL.DECODE_TABLE;

        const line = new Uint8Array(base64.length);
        let lineCharCount = 0;

        for (let i = 0; i < base64.length; i++) {
            const c = base64.charCodeAt(i);
            if (c !== CharCodes.CR
                && c !== CharCodes.LF
                && c !== CharCodes.SP
                && c !== CharCodes.HT) {
                    
                line[lineCharCount++] = c;
            }
        }

        if (lineCharCount % 4 !== 0)
            throw new KastenBase64DecodeError('Invalid length string');

        let firstPad = -1;

        for (let i = 0; i < lineCharCount; i++) {
            if (line[i] === RFC4648Base64URL.PADDING_CHAR_CODE) {
                firstPad = i;
                break;
            }
        }

        if (firstPad !== -1) {

            if (firstPad < lineCharCount - 2) {
                throw new KastenBase64DecodeError('Invalid padding position');
            }

            for (let i = firstPad; i < lineCharCount; i++) {
                if (line[i] !== RFC4648Base64URL.PADDING_CHAR_CODE) {
                    throw new KastenBase64DecodeError('Invalid padding');
                }
            }

            const padCount = lineCharCount - firstPad;

            if (padCount !== 1 && padCount !== 2) {
                throw new KastenBase64DecodeError('Invalid padding');
            }
        }

        const lineLength = lineCharCount;

        const padding = 
            line[lineLength - 1] === RFC4648Base64URL.PADDING_CHAR_CODE
            ? (line[lineLength - 2] === RFC4648Base64URL.PADDING_CHAR_CODE ? 2 : 1)
            : 0;

        const bytes = new Uint8Array((lineCharCount / 4) * 3 - padding);

        let writtenOffset = 0;

        for (let i = 0; i < lineCharCount; i += 4) {

            const code1 = line[i]!;
            const code2 = line[i + 1]!;
            const code3 = line[i + 2]!;
            const code4 = line[i + 3]!;

            const ci1 = DECODE_TABLE[code1]!;
            const ci2 = DECODE_TABLE[code2]!;
            const ci3 = code3 !== RFC4648Base64URL.PADDING_CHAR_CODE ? DECODE_TABLE[code3]! : 0;
            const ci4 = code4 !== RFC4648Base64URL.PADDING_CHAR_CODE ? DECODE_TABLE[code4]! : 0;

            if (ci1 === 255 ||
                ci2 === 255 ||
                (code3 !== RFC4648Base64URL.PADDING_CHAR_CODE && ci3 === 255) ||
                (code4 !== RFC4648Base64URL.PADDING_CHAR_CODE && ci4 === 255)) {

                throw new KastenBase64DecodeError("Invalid Base64");
            }

            const b1 = (ci1 << 2) | (ci2 >> 4);
            const b2 = ((ci2 & 15) << 4) | (ci3 >> 2);
            const b3 = ((ci3 & 3) << 6) | ci4;

            bytes[writtenOffset++] = b1;
            
            if (code3 !== RFC4648Base64URL.PADDING_CHAR_CODE) {
                bytes[writtenOffset++] = b2;
            }

            if (code4 !== RFC4648Base64URL.PADDING_CHAR_CODE) {
                bytes[writtenOffset++] = b3;
            }
        }

        return bytes;
    }
}