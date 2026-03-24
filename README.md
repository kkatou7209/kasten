# Kasten

TypeScript Toolbox of Codecs and Cryptographies.

## Features

- Base 64 Encoding/Decoding
  - RFC2045
  - RFC4648
  - RFC4648 (URL)
- Base 32 Encoding/Decoding
  - RFC4648
  - RFC4648 (Hex)
- Base 16 Encoding/Decoding
  - RFC4648
- Base 85
  - Ascii85 (WIP)
- Run-Length Encoding/Decoding
  - Basic
  - PackBits
- LZ77 Encoding/Decoding (WIP)

## Usage

Create codec instance with static methods of `Kasten`.

```ts
const data: Uint8Array = ...;

const base64 = Kasten.base64('rfc4648');

const encoded: string = base64.encode(data);

const decoded: Uint8Array = base64.decode(encoded);
```

All codecs available in Kasten are below.

|Group|Spec|Method|Category|Summary|
|:-|:-|:-|:-|:-|
|Base 64|RFC2045|`base64`|`rfc2045`|The old Base 64 specification.|
|Base 64|RFC4648|`base64`|`rfc4648`|The latest Base 64 specification.|
|Base 64|RFC4648(URL)|`base64`|`rfc4648-url`|The latest Base 64 specification for URL safe encoding.|
|Base 32|RFC4648|`base32`|`rfc4648`|The latest Base 32 specification.|
|Base 32|RFC4648 (HEX)|`base32`|`rfc4648-hex`|The latest Base 32 specification for hexadecimal encoding.|
|Base 16|RFC4648|`base16`|`rfc4648`|The latest Base 16 specification.|
|Run-Length|Basic|`runLength`|`basic`|The basic and old Run-Length encoding.|
|Run-Length|Basic|`runLength`|`pack-bits`|The old Run-Length encoding of Apple.|

## License

This project is licensed under the MIT License.