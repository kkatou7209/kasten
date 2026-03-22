import { KastenError } from '@/errors';

export class KastenBase32Error extends KastenError {}

export class KastenBase32EncodeError extends KastenBase32Error {}

export class KastenBase32DecodeError extends KastenBase32Error {}