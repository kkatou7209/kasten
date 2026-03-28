import { Base16 } from '@/codecs/base16';
import { CharCodes } from '@/utils/char-codes';
import { KastenBase16DecodeError } from '@/codecs/base16/errors';

/**
 * AsciiHexDecode codec of PDF1.7
 */
export class AsciiHexDecode extends Base16 {
    
    public override encodeBytes(bytes: Uint8Array): string {

        if (bytes.length === 0) return '>';

        const chars: string[] = [];

        for (const byte of bytes) {
            const char = byte.toString(16).padStart(2, '0');
            chars.push(char);
        }

        chars.push('>');

        return chars.join('');
    }

    public override decodeString(base16: string): Uint8Array {

        const chars: string[] = [];

        for (const c of base16) {

            if (c === '>') break;
            
            if (CharCodes.isWhitespace(c)) continue;
            
            const code = c.charCodeAt(0);
            
            if (!(48 <= code && code <= 57) && !(65 <= code && code <= 70) && !(97<= code && code <= 102))
                throw new KastenBase16DecodeError(`invalid char: ${c}`);

            chars.push(c);
        }

        if (chars.length % 2 !== 0) chars.push('0');

        const strLength = chars.length;

        const bytes = new Uint8Array(Math.ceil(strLength / 2));

        let byteCount = 0;

        for (let i = 0, j = 0; i < strLength; i += 2, j++) {
            
            const hex = chars[i]! + chars[i + 1]!;

            const byte = Number.parseInt(hex, 16);

            bytes[byteCount++] = byte;
        }

        return bytes.subarray(0, byteCount);
    }
}