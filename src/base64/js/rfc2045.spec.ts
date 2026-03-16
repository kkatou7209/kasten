import { describe, expect } from 'bun:test';
import { it } from 'node:test';
import { Rfc2045Base64 } from '@/base64/js/rfc2045';

describe('Rfc2045 tests', () => {

    it('should encode to base64', () => {

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

        const base64 = new Rfc2045Base64();

        const textEncoder = new TextEncoder();

        for(const _case of cases) {

            const bytes = textEncoder.encode(_case[0]);

            expect(base64.encode(bytes)).toEqual(_case[1]!);
        }
    });
});