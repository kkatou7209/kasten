import { Compressor } from '@/compressors/compressor';

export const RunLengthCatgories = ['basic', 'pack-bits', 'pdf'] as const;

export type RunLengthCatgory = typeof RunLengthCatgories[number];

/**
 * Run-Length encoding and decoding.
 */
export abstract class RunLength extends Compressor {}