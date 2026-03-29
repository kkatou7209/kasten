import { Codec } from '@/codecs/codec';

export const Base16Categories = ['rfc-4648', 'ascii-hex'] as const;

export type Base16Category = typeof Base16Categories[number];

/**
 * Base16 encoding and decoding.
 */
export abstract class Base16 extends Codec {}