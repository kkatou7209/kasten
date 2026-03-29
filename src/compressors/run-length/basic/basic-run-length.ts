import { RunLength } from '@/compressors/run-length';

/**
 * Basic Run-Length codec.
 */
export class BasicRunLength extends RunLength {
    
    public override compressBytes(bytes: Uint8Array): Uint8Array {

        const encoded = new Uint8Array(bytes.length * 2);

        let byteCount = 0;

        let prev: number | null = null;

        let count = 0;

        for(let i = 0; i < bytes.length; i++) {

            const byte = bytes[i]!;

            if (prev === null) {
                prev = byte;
                count = 1;
                continue;
            }

            if (prev === byte) {

                if (count < 255) {
                    count++;
                    continue;
                }
            }

            encoded[byteCount++] = count;
            encoded[byteCount++] = prev;

            prev = byte;
            count = 1;
        }

        if (prev !== null) {
            encoded[byteCount++] = count;
            encoded[byteCount++] = prev;
        }

        return encoded.subarray(0, byteCount);
    }
    
    public override decompressBytes(runLength: Uint8Array): Uint8Array {

        const decoded: number[] = [];

        for (let i = 0; i < runLength.length; i += 2) {

            const count = runLength[i]!;

            const byte = runLength[i + 1]!;

            for (let j = 0; j < count; j++) {
                decoded.push(byte);
            }
        }

        return new Uint8Array(decoded);
    }
}