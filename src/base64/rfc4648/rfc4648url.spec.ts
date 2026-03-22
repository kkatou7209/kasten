import { describe, expect, it } from 'bun:test';
import { KastenBase64DecodeError } from '@/base64/errors';
import { RFC4648Base64URL } from '@/base64/rfc4648/rfc4648url';

describe('RFC4648Base64URL tests', () => {

    it('should encode and decode base64url text vectors', () => {

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

        const base64url = new RFC4648Base64URL();
        const textEncoder = new TextEncoder();
        const textDecoder = new TextDecoder();

        for (const testCase of cases) {
            const bytes = textEncoder.encode(testCase[0]);
            const encoded = base64url.encode(bytes);

            expect(encoded).toEqual(testCase[1]!);
            expect(textDecoder.decode(base64url.decode(encoded))).toEqual(testCase[0]!);
        }
    });

    it('should use the url safe alphabet during encoding', () => {

        const base64url = new RFC4648Base64URL();
        const bytes = Uint8Array.from([251, 255, 255]);

        expect(base64url.encode(bytes)).toEqual('-___');
        expect(Array.from(base64url.decode('-___'))).toEqual(Array.from(bytes));
    });

    it('should ignore ASCII whitespace while decoding', () => {

        const base64url = new RFC4648Base64URL();
        const textDecoder = new TextDecoder();

        expect(textDecoder.decode(base64url.decode(' Zm9v\r\n\tYmFy '))).toEqual('foobar');
    });

    it('should reject invalid base64url strings', () => {

        const base64url = new RFC4648Base64URL();

        expect(() => base64url.decode('abc')).toThrow(KastenBase64DecodeError);
        expect(() => base64url.decode('ab=c')).toThrow(KastenBase64DecodeError);
        expect(() => base64url.decode('A===')).toThrow(KastenBase64DecodeError);
        expect(() => base64url.decode('+///')).toThrow(KastenBase64DecodeError);
    });
});