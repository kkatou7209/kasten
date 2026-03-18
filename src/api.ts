import type { Base64, Base64Catgory } from "./base64";
import { RFC2025Base64 } from "./base64/rfc2025/rfc2025";
import { RFC4648Base64 } from "./base64/rfc4648/rfc4648";
import { RFC4648Base64URL } from "./base64/rfc4648/rfc4648url";
import { KastenError } from '@/errors';

export class Kasten {

    private constructor() {}

    public static base64Default = (): Base64 => new RFC4648Base64();

    public static base64 = (category: Base64Catgory): Base64 => {

        switch(category) {
            case 'rfc4648':
                return new RFC4648Base64();
            case 'rfc4648-url':
                return new RFC4648Base64URL();
            case 'rfc2025':
                return new RFC2025Base64();
            default:
                throw new KastenError(`No Base64 implementation found for '${category}'`);
        }
    }
}