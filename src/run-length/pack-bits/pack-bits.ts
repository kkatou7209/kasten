import { RunLength } from '@/run-length';

export class PackBits extends RunLength {

    public override encode(bytes: Uint8Array): Uint8Array {

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
    
    public override decode(runLength: Uint8Array): Uint8Array {
        throw new Error('Method not implemented.');
    }
}