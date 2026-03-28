import { KastenError } from '@/errors';

export class KastenBase16Error extends KastenError {}

export class KastenBase16EncodeError extends KastenBase16Error {}

export class KastenBase16DecodeError extends KastenBase16Error {}