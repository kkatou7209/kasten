import { describe, expect } from 'bun:test';
import { it } from 'node:test';
import { RFC2045Base64 } from '@/base64/rfc2045/rfc2045';

describe('Rfc2045 tests', () => {

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

            const encoded = base64.encode(bytes);

            expect(encoded).toEqual(_case[1]!);

            expect(textDecoder.decode(base64.decode(encoded)), _case[0]);
        }
    });
});