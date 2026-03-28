import { describe, expect, it } from 'bun:test';
import { isByteSource, type ByteSource } from './bytes';

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
});