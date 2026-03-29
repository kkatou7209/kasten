import { describe, expect, it } from 'bun:test';
import { isByteSource, toBytes, toStr, type ByteSource } from './bytes';

describe('bytes utility test', () => {

    it('should check byte source type', () => {

        expect(isByteSource(new Uint8Array)).toBeTruthy();
        expect(isByteSource(new Uint8ClampedArray)).toBeTruthy();
        expect(isByteSource(new Uint16Array)).toBeTruthy();
        expect(isByteSource(new Uint32Array)).toBeTruthy();
        expect(isByteSource('')).toBeTruthy();

        expect(isByteSource(null as unknown as ByteSource)).toBeFalsy();
        expect(isByteSource(0 as unknown as ByteSource)).toBeFalsy();
        expect(isByteSource({} as unknown as ByteSource)).toBeFalsy();
    });

    it('should convert source to bytes', () => {

        expect(toBytes('abc')).toEqual(new Uint8Array([97, 98, 99]));

        const u8 = new Uint8Array([1, 2, 3, 4]);
        expect(toBytes(u8)).toEqual(new Uint8Array([1, 2, 3, 4]));

        const u8c = new Uint8ClampedArray([255, 1, 2]);
        expect(toBytes(u8c)).toEqual(new Uint8Array([255, 1, 2]));

        const u16 = new Uint16Array([0x7D56, 0x9ADE, 0x4593]);
        expect(toBytes(u16)).toEqual(new Uint8Array(u16.buffer, u16.byteOffset, u16.byteLength));

        const u32 = new Uint32Array([0x12345678, 0x90ABCDEF]);
        expect(toBytes(u32)).toEqual(new Uint8Array(u32.buffer, u32.byteOffset, u32.byteLength));
    });

    it('should convert typed-array slice using byte offset and length', () => {

        const source = new Uint8Array([10, 20, 30, 40, 50]);
        const view = source.subarray(1, 4);

        expect(toBytes(view)).toEqual(new Uint8Array([20, 30, 40]));
    });

    it('should convert source to string', () => {

        expect(toStr('plain')).toBe('plain');
        expect(toStr(new Uint8Array([97, 98, 99]))).toBe('abc');

        const utf8 = new Uint8Array([227, 129, 130, 227, 129, 132]); // "あい"
        expect(toStr(utf8)).toBe('あい');
    });
});