import { describe, expect, it } from 'bun:test';
import { RFC4648Base32Hex } from '@/codecs/base32/rfc4648/rfc4648hex';

describe('RFC4648Base32Hex tests', () => {

    it('should encode and decode correctly.', () => {

        const cases = [
            ['', ''],
            ['f', 'CO======'],
            ['fo', 'CPNG===='],
            ['foo', 'CPNMU==='],
            ['foob', 'CPNMUOG='],
            ['fooba', 'CPNMUOJ1'],
            ['foobar', 'CPNMUOJ1E8======'],
        ];

        const encoder = new TextEncoder();

        const base32 = new RFC4648Base32Hex();

        for (const _case of cases) {

            const bytes = encoder.encode(_case[0]!);

            expect(base32.encode(bytes)).toEqual(_case[1]!);
            expect(base32.decode(_case[1]!)).toEqual(bytes);
        }
    });
});