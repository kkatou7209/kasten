import { KastenError } from '@/errors';

export class KastenRunLengthError extends KastenError {}

export class KastenRunLengthEncodeError extends KastenRunLengthError {}

export class KastenRunLengthDecodeError extends KastenRunLengthError {}