import { describe, expect, it } from 'bun:test';
import { Ascii85 } from '@/codecs/base85/ascii85/ascii85';
import { KastenBase85DecoderError } from '@/errors';

describe('Ascii85 tests', () => {

    it('should encode correctly for known vectors', () => {

        const encoder = new TextEncoder();
        const ascii85 = new Ascii85();

        const cases: [Uint8Array, string][] = [
            [new Uint8Array([]), '<~~>'],
            [new Uint8Array([0x00, 0x00, 0x00, 0x00]), '<~z~>'],
            [encoder.encode('Hello'), '<~87cURDZ~>'],
            [encoder.encode('Hello, world!'), '<~87cURD_*#TDfTZ)+T~>'],
            [encoder.encode('Man sure.'), '<~9jqo^F*2M7/c~>'],
        ];

        for (const [bytes, expected] of cases) {
            expect(ascii85.encodeBytes(bytes)).toEqual(expected);
        }
    });

    it('should decode correctly for known vectors', () => {

        const encoder = new TextEncoder();
        const ascii85 = new Ascii85();

        const cases: [string, Uint8Array][] = [
            ['<~~>', new Uint8Array([])],
            ['<~z~>', new Uint8Array([0x00, 0x00, 0x00, 0x00])],
            ['<~87cURDZ~>', encoder.encode('Hello')],
            ['<~87cURD_*#TDfTZ)+T~>', encoder.encode('Hello, world!')],
            ['<~9jqo^F*2M7/c~>', encoder.encode('Man sure.')],
        ];

        for (const [encoded, expected] of cases) {
            expect(ascii85.decodeString(encoded)).toEqual(expected);
        }
    });

    it('should decode even when input contains ASCII whitespace', () => {

        const ascii85 = new Ascii85();
        const encoder = new TextEncoder();

        expect(ascii85.decodeString('<~87cU R\r\nD_*#\tTDfTZ)+T~>')).toEqual(
            encoder.encode('Hello, world!'),
        );
    });

    it('should reject invalid characters', () => {

        const ascii85 = new Ascii85();

        expect(() => ascii85.decodeString('<~87cURD_*#TDfTZ)+{~>')).toThrow(KastenBase85DecoderError);
        expect(() => ascii85.decodeString('<~abcde🙂~>')).toThrow(KastenBase85DecoderError);
    });

    it('should reject z shorthand at non-group boundary', () => {

        const ascii85 = new Ascii85();

        expect(() => ascii85.decodeString('<~!!!!z~>')).toThrow(KastenBase85DecoderError);
    });

    it('should round-trip random binary payloads', () => {

        const ascii85 = new Ascii85();

        const cases = [
            crypto.getRandomValues(new Uint8Array(1)),
            crypto.getRandomValues(new Uint8Array(7)),
            crypto.getRandomValues(new Uint8Array(31)),
            crypto.getRandomValues(new Uint8Array(256)),
        ];

        for (const bytes of cases) {
            const encoded = ascii85.encodeBytes(bytes);
            expect(ascii85.decodeString(encoded)).toEqual(bytes);
        }
    });
});