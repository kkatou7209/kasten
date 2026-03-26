# Kasten

TypeScript toolbox for encoding, decoding, and compression algorithms with no dependencies.

> This library is currently in development.
>
> The API can be changed in future release.

## Goals

To provide several codec utility with no dependencies and simple API.

## Features

*Kasten* provides several variant of encoding, decoding and compression functionalities for JavaScript.

- Base 64 Encoding/Decoding
  - RFC2045
  - RFC4648
  - RFC4648 (URL)
- Base 32 Encoding/Decoding
  - RFC4648
  - RFC4648 (Hex)
- Base 16 Encoding/Decoding
  - RFC4648
  - AsciiHexDecode (PDF1.7)
- Base 85
  - (WIP)Ascii85Decode (PDF1.7)
- Run-Length Encoding/Decoding
  - Basic
  - PackBits
  - RunLengthDecode (PDF1.7)

You can uses those features by very simple API. See also [Usage](#usage) section.

Following features are currently working in progress. 

Other formats can be added in future.

- Base 85
  - Ascii85Decode (PDF1.7)
- LZ77
  - Pure LZ77
  - LZSS
  - LZ4
- LZW
- LZH
- LZX
- Deflate
- Zstd
- Brotli

## Usage

Create codec instance with static methods of `Kasten`.

```ts
import { Kasten } from 'kasten-js';

const data: Uint8Array = ...;

const base64 = Kasten.base64('rfc4648');

const encoded: string = base64.encode(data);

const decoded: Uint8Array = base64.decode(encoded);
```

If no category specified, returns default implementation.

```ts
import { Kasten } from 'kasten-js';

const base16 = Kasten.base16();
```

All codecs available in Kasten are below.

|Group|Spec|Method|Category|Summary|
|:-|:-|:-|:-|:-|
|Base 64|RFC2045|`base64`|`rfc2045`|The old Base 64 specification.|
|Base 64|RFC4648|`base64`|`rfc4648`|The latest Base 64 specification. It is compatible with `Uint8Array.prototype.toBase64`.|
|Base 64|RFC4648(URL)|`base64`|`rfc4648-url`|The latest Base 64 specification for URL safe encoding. It is compatible with `Uint8Array.prototype.toBase64`.|
|Base 32|RFC4648|`base32`|`rfc4648`|The latest Base 32 specification.|
|Base 32|RFC4648 (HEX)|`base32`|`rfc4648-hex`|The latest Base 32 specification for hexadecimal encoding.|
|Base 16|RFC4648|`base16`|`rfc4648`|The latest Base 16 specification.|
|Base 16|AsciiHexDecode (PDF1.7)|`base16`|`ascii`|The Base 16 specification of PDF1.7.|
|Run-Length|Basic|`runLength`|`basic`|The basic and old Run-Length encoding.|
|Run-Length|PackBits|`runLength`|`pack-bits`|The old Run-Length encoding accepted by [MacPrint of Apple](https://web.archive.org/web/20080705155158/http://developer.apple.com/technotes/tn/tn1023.html).|
|Run-Length|RunLengthDecode (PDF1.7)|`runLength`|`pdf`|The Run-Length specofication of PDF1.7.|

## License

This project is licensed under the MIT License.