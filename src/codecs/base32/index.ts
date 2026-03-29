import { Codec } from '@/codecs/codec';

export type Base32Category = typeof Base32Categories[number];

export const Base32Categories = ['rfc-4648', 'rfc-468-hex'] as const;

/**
 * Base32 encoding and decoding.
 */
export abstract class Base32 extends Codec {}