import type { RunLength, RunLengthCatgory } from '@/compressors/run-length';
import { BasicRunLength } from '@/compressors/run-length/basic/basic-run-length';
import { PackBits } from '@/compressors/run-length/pack-bits/pack-bits';
import { Pdf } from '@/compressors/run-length/pdf/pdf';

/**
 * Compressor functory
 */
export class Compressors {

    /**
     * Creates Run-Length codec instance.
     */
    public runLength = (category?: RunLengthCatgory): RunLength => {

        switch(category) {
            case 'pack-bits':
                return new PackBits();
            case 'pdf':
                return new Pdf();
            case 'basic':
            default:
                return new BasicRunLength();
        }
    }
}