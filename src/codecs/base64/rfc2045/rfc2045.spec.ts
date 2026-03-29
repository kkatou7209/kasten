import { describe, expect, it } from 'bun:test';
import { KastenBase64DecodeError } from '@/codecs/base64/errors';
import { RFC2045Base64 } from '@/codecs/base64/rfc2045/rfc2045';

describe('RFC2025Base64 tests', () => {

    it('should encode and decode base64', () => {

        const cases = [
            ['', ''],
            ['f', 'Zg=='],
            ['fo', 'Zm8='],
            ['foo', 'Zm9v'],
            ['foob', 'Zm9vYg=='],
            ['fooba', 'Zm9vYmE='],
            ['foobar', 'Zm9vYmFy'],
            [
                'A'.repeat(57),
                'QUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFB'
            ],
            [
                'A'.repeat(58),
                'QUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFB\r\nQQ=='
            ]
        ];

        const base64 = new RFC2045Base64();

        const textEncoder = new TextEncoder();
        const textDecoder = new TextDecoder();

        for(const _case of cases) {

            const bytes = textEncoder.encode(_case[0]);

            const encoded = base64.encodeBytes(bytes);

            expect(encoded).toEqual(_case[1]!);

            expect(textDecoder.decode(base64.decodeString(encoded)), _case[0]);
        }
    });

    it('should use the standard base64 alphabet during encoding', () => {

        const base64 = new RFC2045Base64();
        const bytes = Uint8Array.from([251, 255, 255]);

        expect(base64.encodeBytes(bytes)).toEqual('+///');
        expect(Array.from(base64.decodeString('+///'))).toEqual(Array.from(bytes));
    });

    it('should ignore ASCII whitespace while decoding', () => {

        const base64 = new RFC2045Base64();
        const textDecoder = new TextDecoder();

        expect(textDecoder.decode(base64.decodeString(' Zm9v\r\n\tYmFy '))).toEqual('foobar');
    });

    it('should reject invalid base64 strings', () => {

        const base64 = new RFC2045Base64();

        expect(() => base64.decodeString('abc')).toThrow(KastenBase64DecodeError);
        expect(() => base64.decodeString('ab=c')).toThrow(KastenBase64DecodeError);
        expect(() => base64.decodeString('A===')).toThrow(KastenBase64DecodeError);
        expect(() => base64.decodeString('-___')).toThrow(KastenBase64DecodeError);
    });
});