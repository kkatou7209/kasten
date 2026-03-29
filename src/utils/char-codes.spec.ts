import { describe, expect, it } from 'bun:test';
import { CharCodes } from './char-codes';
import { KastenError } from '@/errors';

describe('CharCodes tests', () => {

    it('should checks if character is white space correctly.', () => {

        expect(CharCodes.isWhitespace('\t')).toBeTruthy();
        expect(CharCodes.isWhitespace('\r')).toBeTruthy();
        expect(CharCodes.isWhitespace('\n')).toBeTruthy();
        expect(CharCodes.isWhitespace(' ')).toBeTruthy();
        expect(CharCodes.isWhitespace('\v')).toBeTruthy();
        expect(CharCodes.isWhitespace('\f')).toBeTruthy();

        expect(CharCodes.isWhitespace('A')).toBeFalsy();
        expect(CharCodes.isWhitespace('　')).toBeFalsy();
    });

    it('should throw when a invalid argument given', () => {

        expect(() => CharCodes.isWhitespace('\r\n')).toThrow(Error);
        expect(() => CharCodes.isWhitespace(undefined as unknown as string)).toThrow(Error);
        expect(() => CharCodes.isWhitespace(null as unknown as string)).toThrow(Error);
    });
});