import { describe, expect, it } from 'bun:test';
import { RFC4648Base16 } from '@/codecs/base16/rfc4648/rfc4648';

describe('RFC4648Base16 tests', () => {

    it('should encode and decode correctly.', () => {

        const cases = [
            ['', ''],
            ['f', '66'],
            ['fo', '666F'],
            ['foo', '666F6F'],
            ['foob', '666F6F62'],
            ['fooba', '666F6F6261'],
            ['foobar', '666F6F626172'],
        ];

        const encoder = new TextEncoder();

        const base16 = new RFC4648Base16();

        for (const _case of cases) {

            const bytes = encoder.encode(_case[0]!);

            expect(base16.encode(bytes)).toEqual(_case[1]!);
            expect(base16.decode(_case[1]!)).toEqual(bytes);
        }
    });

    it('should decode correctly if string contains spaces', () => {

        const cases = [
            ['66', 'f'],
            ['666F', 'fo'],
            ['666\nF6F', 'foo'],
            ['666F6\r\nF62', 'foob'],
            ['666F6F\t6261', 'fooba'],
            ['666F6F626172', 'foobar'],
        ];

        const encoder = new TextEncoder();

        const base16 = new RFC4648Base16();

        for (const _case of cases) {

            const bytes = encoder.encode(_case[1]!);

            expect(base16.decode(_case[0]!)).toEqual(bytes);
        }
    });
});