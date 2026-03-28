import { Codec } from '@/codecs/codec';

export type Base64Category = typeof Base64Categories[number];

export const Base64Categories = ['rfc4648', 'rfc4648-url', 'rfc2025'] as const;

/**
 * Base64 encoding and decoding.
 */
export abstract class Base64 extends Codec {}