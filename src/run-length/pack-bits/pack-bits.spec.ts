import { describe, expect, it } from 'bun:test';
import { PackBits } from '@/run-length/pack-bits/pack-bits';

describe('BasicRunLength tests', () => {

    it('should decode and encode bytes', () => {

        const cases = [
            [
                new Uint8Array([0x05, 0x05, 0x7F, 0x65, 0x65, 0x65, 0x35, 0x35, 0x45]),
                new Uint8Array([0x02, 0x05, 0x05, 0x7F, 0xFE, 0x65, 0x02, 0x35, 0x35, 0x45]),
            ],
            [
                new Uint8Array([]),
                new Uint8Array([]),
            ],
            [
                new Uint8Array([0xE4, 0xE4, 0xE4, 0xE4, 0xE4, 0xE4, 0x39, 0x08, 0x08, 0x08]),
                new Uint8Array([0xFB, 0xE4, 0x00, 0x39, 0xFE, 0x08]),
            ],
            [
                new Uint8Array([0x41, 0x42, 0x43, 0x44, 0x44, 0x44]),
                new Uint8Array([0x02, 0x41, 0x42, 0x43, 0xFE, 0x44]),
            ],
            [
                new Uint8Array([0x41, 0x41, 0x41, 0x42, 0x43, 0x44, 0x44, 0x44, 0x45]),
                new Uint8Array([0xFE, 0x41, 0x01, 0x42, 0x43, 0xFE, 0x44, 0x00, 0x45])
            ],
            [
                new Uint8Array(129).fill(0x45),
                new Uint8Array([0x81, 0x45, 0x00, 0x45])
            ],
            [
                new Uint8Array(Array.from({ length: 129}).map((_, i) => i)),
                new Uint8Array([0x7F, ...Array.from({ length: 128 }).map((_, i) => i), 0x00, 0x80])
            ],
        ];

        const runLength = new PackBits();

        for(const _case of cases) {

            const encoded = runLength.encode(_case[0]!);
            expect(encoded).toEqual(_case[1]!);

            // const decoded = runLength.decode(_case[1]!);
            // expect(decoded).toEqual(_case[0]!);
        }
    });

    // it('should repeat count is lower than equal to 255.', () => {

    //     const cases = [
    //         [
    //             new Uint8Array(Array.from({ length: 256 }).map(_ => 0x06)),
    //             new Uint8Array([0xFF, 0x06, 0x01, 0x06])
    //         ]
    //     ];

    //     const runLength = new BasicRunLength();

    //     for(const _case of cases) {

    //         const encoded = runLength.encode(_case[0]!);
    //         expect(encoded).toEqual(_case[1]!);

    //         const decoded = runLength.decode(_case[1]!);
    //         expect(decoded).toEqual(_case[0]!);
    //     }
    // });
});