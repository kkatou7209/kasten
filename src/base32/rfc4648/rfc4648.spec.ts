import { describe, expect, it } from 'bun:test';
import { RFC4648Base32 } from './rfc4648';

describe('RFC4648Base32 tests', () => {

    it('should encode and decode correctly.', () => {

        const cases = [
            ['', ''],
            ['f', 'MY======'],
            ['fo', 'MZXQ===='],
            ['foo', 'MZXW6==='],
            ['foob', 'MZXW6YQ='],
            ['fooba', 'MZXW6YTB'],
            ['foobar', 'MZXW6YTBOI======'],
        ];

        const encoder = new TextEncoder();

        const base32 = new RFC4648Base32();

        for (const _case of cases) {

            const bytes = encoder.encode(_case[0]!);

            expect(base32.ecode(bytes)).toEqual(_case[1]!);
            expect(base32.decode(_case[1]!)).toEqual(bytes);
        }
    });
});