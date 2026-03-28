import { RunLength } from '@/compressors/run-length';
import { KastenRunLengthDecodeError } from '../errors';

/**
 * PackBits codec.
 */
export class PackBits extends RunLength {

    public override compressBytes(bytes: Uint8Array): Uint8Array {

        if (bytes.length === 0) return new Uint8Array([]);

        const byteLength = bytes.length;

        const encoded: number[] = [];

        let i = 0;

        while(i < byteLength) {

            const byte = bytes[i]!;

            let j = 1;

            while (i + j < byteLength && byte === bytes[i + j] && j < 128) {
                j++;
            }

            if (j >= 3) {
                encoded.push(256 - (j - 1));
                encoded.push(byte);
                i += j;
                continue;
            }

            while (i + j < byteLength && j < 128) {

                const pos = i + j;

                const _byte = bytes[pos]!;

                if (bytes[pos - 1] === _byte && _byte === bytes[pos + 1]) {
                    j--;
                    break;
                }

                j++;
            }

            encoded.push(j - 1);

            for (let k = i; k < i + j; k++) {
                encoded.push(bytes[k]!);
            }

            i += j;
        }

        return new Uint8Array(encoded);
    }
    
    public override decompressBytes(runLength: Uint8Array): Uint8Array {

        const decoded: number[] = [];

        const byteLength = runLength.length;

        let i = 0;

        while(i < byteLength) {

            const header = runLength[i]!;

            if (header === 0x80) continue;

            if (0 <= header && header <= 0x7F) {
                
                const end = i + header + 2;

                for (let j = i + 1; j < end; j++) {

                    const byte = runLength[j];

                    if (byte === undefined)
                        throw new KastenRunLengthDecodeError('Invalid PackBits encoding');

                    decoded.push(byte);
                }

                i = end;
                continue;
            }

            if (0x81 <= header && header <= 0xFF) {

                const count = 0x101 - header;

                const byte = runLength[i + 1];

                if (byte === undefined)
                    throw new KastenRunLengthDecodeError('Invalid PackBits encoding');

                for (let j = 0; j < count; j++) {
                    decoded.push(byte);                    
                }

                i += 2;
                continue;
            }
        }

        return new Uint8Array(decoded);
    }
}