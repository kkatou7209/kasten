import { Codec } from '@/codecs/codec';

export const Base85Categories = ['ascii-85'] as const;

export type Base85Category = typeof Base85Categories[number];

/**
 * Base85 codec.
 */
export abstract class Base85 extends Codec {};