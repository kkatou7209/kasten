import { describe, expect, it } from 'bun:test';
import { BasicRunLength } from '@/run-length/basic/basic-run-length';

describe('BasicRunLength tests', () => {

    it('should decode and encode bytes', () => {

        const cases = [
            [
                new Uint8Array([0x05, 0x05, 0x7F, 0x65, 0x65, 0x65, 0x35, 0x35, 0x45]),
                new Uint8Array([0x02, 0x05, 0x01, 0x7F, 0x03, 0x65, 0x02, 0x35, 0x01, 0x45]),
            ],
            [
                new Uint8Array([]),
                new Uint8Array([]),
            ],
            [
                new Uint8Array([0xE4, 0xE4, 0xE4, 0xE4, 0xE4, 0xE4, 0x39, 0x08, 0x08, 0x08]),
                new Uint8Array([0x06, 0xE4, 0x01, 0x39, 0x03, 0x08]),
            ],
        ];

        const runLength = new BasicRunLength();

        for(const _case of cases) {

            const encoded = runLength.encode(_case[0]!);
            expect(encoded).toEqual(_case[1]!);

            const decoded = runLength.decode(_case[1]!);
            expect(decoded).toEqual(_case[0]!);
        }
    });

    it('should repeat count is lower than equal to 255.', () => {

        const cases = [
            [
                new Uint8Array(Array.from({ length: 256 }).map(_ => 0x06)),
                new Uint8Array([0xFF, 0x06, 0x01, 0x06])
            ]
        ];

        const runLength = new BasicRunLength();

        for(const _case of cases) {

            const encoded = runLength.encode(_case[0]!);
            expect(encoded).toEqual(_case[1]!);

            const decoded = runLength.decode(_case[1]!);
            expect(decoded).toEqual(_case[0]!);
        }
    });
});