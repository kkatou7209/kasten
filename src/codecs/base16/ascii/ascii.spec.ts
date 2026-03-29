import { describe, expect, it } from 'bun:test';
import { AsciiHexDecode } from '@/codecs/base16/ascii/ascii';
import { KastenBase16DecodeError } from '@/codecs/base16/errors';

describe('AsciiHexDecode tests', () => {

    it('should encode correctly for variant input lengths', () => {

        const cases: [Uint8Array, string][] = [
            [new Uint8Array([]), '>'],
            [new Uint8Array([0x00]), '00>'],
            [new Uint8Array([0x0a]), '0a>'],
            [new Uint8Array([0xde, 0xad, 0xbe, 0xef]), 'deadbeef>'],
            [new TextEncoder().encode('Hello'), '48656c6c6f>'],
        ];

        const base16 = new AsciiHexDecode();

        for (const [bytes, expected] of cases) {
            expect(base16.encode(bytes)).toEqual(expected);
        }
    });

    it('should decode correctly for normal vectors', () => {

        const cases: [string, Uint8Array][] = [
            ['>', new Uint8Array([])],
            ['00>', new Uint8Array([0x00])],
            ['0a>', new Uint8Array([0x0a])],
            ['DEADBEEF>', new Uint8Array([0xde, 0xad, 0xbe, 0xef])],
            ['48656c6c6f>', new TextEncoder().encode('Hello')],
        ];

        const base16 = new AsciiHexDecode();

        for (const [input, expected] of cases) {
            expect(base16.decode(input)).toEqual(expected);
        }
    });

    it('should encode and decode random big bytes', () => {

        const cases = [
            crypto.getRandomValues(new Uint8Array(Math.ceil(Math.random() * 100_000))),
            crypto.getRandomValues(new Uint8Array(Math.ceil(Math.random() * 100_000))),
            crypto.getRandomValues(new Uint8Array(Math.ceil(Math.random() * 100_000))),
        ];

        const base16 = new AsciiHexDecode();

        for (const _case of cases) {
            const encoded = base16.encode(_case);
            expect(base16.decode(encoded)).toEqual(_case);
        }
    });

    it('should decode with mixed-case hex characters and whitespace', () => {

        const base16 = new AsciiHexDecode();

        expect(base16.decode('De Ad\nBe\tEf >')).toEqual(
            new Uint8Array([0xde, 0xad, 0xbe, 0xef]),
        );
    });

    it('should pad odd trailing nibble before terminator', () => {

        const base16 = new AsciiHexDecode();

        expect(base16.decode('A>')).toEqual(new Uint8Array([0xa0]));
        expect(base16.decode('61F>')).toEqual(new Uint8Array([0x61, 0xf0]));
    });

    it('should ignore all content after end-of-data marker', () => {

        const base16 = new AsciiHexDecode();

        expect(base16.decode('61>zzzz@#$%')).toEqual(new Uint8Array([0x61]));
    });

    it('should decode even-length input without end-of-data marker', () => {

        const base16 = new AsciiHexDecode();

        expect(base16.decode('4869')).toEqual(new TextEncoder().encode('Hi'));
        expect(base16.decode('')).toEqual(new Uint8Array([]));
    });

    it('should throw on invalid character before end-of-data marker', () => {

        const base16 = new AsciiHexDecode();

        expect(() => base16.decode('0g>')).toThrow(KastenBase16DecodeError);
        expect(() => base16.decode('61@>')).toThrow(KastenBase16DecodeError);
    });

});