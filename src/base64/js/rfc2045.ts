import { Base64 } from '@/base64';

export class Rfc2045Base64 extends Base64 {

    private static readonly TABLE: string
        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    public override encode = (bytes: Uint8Array): string => {

        if (bytes.length === 0) return '';

        const TABLE = Rfc2045Base64.TABLE;

        const baseSize = Math.ceil(bytes.length / 3) * 4;
        const linebreaks = Math.floor((baseSize - 1) / 76);

        const chars = new Array<string>(baseSize + linebreaks * 2);

        let ci = 0;

        let charCout = 0;

        for (let i = 0; i < bytes.length; i += 3) {

            const b1 = bytes[i]!;
            const b2 = bytes[i + 1] ?? 0;
            const b3 = bytes[i + 2] ?? 0;

            const c1 = b1 >> 2;
            const c2 = ((b1 & 0b00000011) << 4) | b2 >> 4;
            const c3 = ((b2 & 0b00001111) << 2) | b3 >> 6;
            const c4 = b3 & 0b00111111;

            chars[ci++] = TABLE[c1]!;
            chars[ci++] = TABLE[c2]!;
            chars[ci++] = TABLE[c3]!;
            chars[ci++] = TABLE[c4]!;

            charCout += 4;

            if (charCout >= 76) {
                charCout = 0;
                chars[ci++] = '\r';
                chars[ci++] = '\n';
            }
        }

        const padding = bytes.length % 3;

        if (padding == 1) {
            chars[ci - 2] = '=';
            chars[ci - 1] = '=';
        } else if (padding == 2) {
            chars[ci - 1] = '=';
        }

        return chars.join('').trim();
    }
    
    public override decode = (base64: string): Uint8Array => {
        throw new Error('Method not implemented.');
    }
}