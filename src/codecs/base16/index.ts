import { Codec } from '@/codecs/codec';

export const Base16Categories = ['rfc4648', 'ascii'] as const;

export type Base16Category = typeof Base16Categories[number];

/**
 * Base16 encoding and decoding.
 */
export abstract class Base16 extends Codec {}