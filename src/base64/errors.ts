import { KastenError } from '@/errors';

/**
 * Base error type of Base64.
 */
export class KastenBase64Error extends KastenError {}

/**
 * Thrown when error occurs on Base64 encoding.
 */
export class KastenBase64EncodeError extends KastenBase64Error {};

/**
 * Thrown when error occurs on Base64 decoding.
 */
export class KastenBase64DecodeError extends KastenBase64Error {};