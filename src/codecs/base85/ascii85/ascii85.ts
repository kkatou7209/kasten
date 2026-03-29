import { KastenBase85DecoderError } from '@/errors';
import { textDecoder, textEncoder } from '@/utils/bytes';
import { CharCodes } from '@/utils/char-codes';
import { Base85 } from '@/codecs/base85';

/**
 * Ascii codec.
 */
export class Ascii85 extends Base85 {
    
    public override encodeBytes(bytes: Uint8Array): string {

        if (bytes.byteLength === 0) return '<~~>';

        const byteLength = bytes.byteLength;

        const remainder = byteLength % 4;

        const chars = new Uint8Array(Math.ceil((byteLength / 4) * 5 + 4));
        let charCount = 0;

        const group = new Array<number>(4);
        let memberCount = 0;

        const charGroup = new Array<number>(5);

        chars[charCount++] = CharCodes.LessThan;
        chars[charCount++] = CharCodes.Tilde;

        for (let i = 0; i < byteLength; i++) {

            group[memberCount++] = bytes[i]!;

            let padded = false;
            
            if (i + 1 >= byteLength && remainder !== 0) {
                group.fill(0, memberCount, 4);
                memberCount = 4;
                padded = true;
            }

            if (memberCount !== 4) continue;

            let value = 0;

            for (const [i, member] of group.entries()) {
                value += (member << (24 - i * 8)) >>> 0;
            }

            if (value === 0 && !padded) {
                chars[charCount++] = this.shorthand;
                memberCount = 0;
                continue;
            }

            for (let j = 5; j > 0; j--) {
                charGroup[j - 1] = (value % 85) + 33;
                value = Math.floor(value / 85);
            }

            const writeCount = padded
                ? remainder + 1
                : charGroup.length;

            for (let j = 0; j < writeCount; j++) {
                chars[charCount++] = charGroup[j]!;
            }
            
            memberCount = 0;
        }

        chars[charCount++] = CharCodes.Tilde;
        chars[charCount++] = CharCodes.GreaterThan;

        return textDecoder.decode(chars.subarray(0 , charCount));
    }

    public override decodeString(base85: string): Uint8Array {

        const { LessThan, GreaterThan, Tilde, isWhitespace } = CharCodes;
        
        // result bytes
        const bytes = new Uint8Array(base85.length);

        let byteCount = 0;

        // 5 char group per 4 bytes
        const group = new Array(5);
        let memberCount = 0;

        for (let i = 0; i < base85.length; i++) {

            const c = base85.charCodeAt(i);

            if (!c) continue;
            
            // skip prefix
            if (c === LessThan && base85.charCodeAt(i + 1) === Tilde) {
                i++;
                continue;
            }

            // EOD
            if (c === Tilde && base85.charCodeAt(i + 1) === GreaterThan) {
                break;
            }
            
            if (isWhitespace(c)) continue;

            // 'z' char
            if (c === this.shorthand) {
                
                if (memberCount !== 0)
                    throw new KastenBase85DecoderError(`Unexpected 'z' at non-group boundary`);

                bytes.fill(0, byteCount, byteCount + 4);
                byteCount += 4;
                continue;
            }

            if (c < 33 || 117 < c)
                throw new KastenBase85DecoderError(`Invalid character: ${String.fromCharCode(c)}`);

            group[memberCount++] = c;

            const isLastChar = i + 1 >= base85.length
                // EOD
                || (base85.charCodeAt(i + 1) === Tilde && base85.charCodeAt(i + 2) === GreaterThan);

            const writeCount = memberCount - 1;
            
            // pad lacked
            if (isLastChar && memberCount !== 5) {
                group.fill(this.padding, memberCount);
                memberCount = 5;
            }

            if (memberCount !== 5) continue;

            let value = 0;

            for (let gi = 0; gi < memberCount; gi++) {
                value = value * 85 + (group[gi]! - 33);
            }

            for (let j = 0; j < writeCount; j++) {
                const shift = 24 - j * 8;
                const byte = (value >>> shift) & 0xFF;
                bytes[byteCount++] = byte;
            }

            if (isLastChar) break;

            group.fill(0);
            memberCount = 0;
        }

        return bytes.subarray(0, byteCount);
    }

    private readonly shorthand = 122;

    private readonly padding = 117;
}