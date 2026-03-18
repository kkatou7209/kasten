import { describe, expect, it } from 'bun:test';
import { KastenBase64DecodeError } from '@/base64/errors';
import { RFC4648Base64 } from '@/base64/rfc4648/rfc4648';

describe('RFC4648Base64 tests', () => {

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

        const base64 = new RFC4648Base64();

        const textEncoder = new TextEncoder();
        const textDecoder = new TextDecoder();

        for(const _case of cases) {

            const bytes = textEncoder.encode(_case[0]);

            const encoded = base64.encode(bytes);

            expect(encoded).toEqual(_case[1]!);

            expect(textDecoder.decode(base64.decode(encoded)), _case[0]);
        }
    });

    it('should use the standard base64 alphabet during encoding', () => {

        const base64 = new RFC4648Base64();
        const bytes = Uint8Array.from([251, 255, 255]);

        expect(base64.encode(bytes)).toEqual('+///');
        expect(Array.from(base64.decode('+///'))).toEqual(Array.from(bytes));
    });

    it('should ignore ASCII whitespace while decoding', () => {

        const base64 = new RFC4648Base64();
        const textDecoder = new TextDecoder();

        expect(textDecoder.decode(base64.decode(' Zm9v\r\n\tYmFy '))).toEqual('foobar');
    });

    it('should reject invalid base64 strings', () => {

        const base64 = new RFC4648Base64();

        expect(() => base64.decode('abc')).toThrow(KastenBase64DecodeError);
        expect(() => base64.decode('ab=c')).toThrow(KastenBase64DecodeError);
        expect(() => base64.decode('A===')).toThrow(KastenBase64DecodeError);
        expect(() => base64.decode('-___')).toThrow(KastenBase64DecodeError);
    });
});