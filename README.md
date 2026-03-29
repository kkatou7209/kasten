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
  - Ascii85Decode (PDF1.7)
- Run-Length Encoding/Decoding
  - Basic
  - PackBits
  - RunLengthDecode (PDF1.7)

You can uses those features by very simple API. See also [Usage](#usage) section.

Following features are currently working in progress. 

Other formats can be added in future.

- Deflate
- Zstd
- Brotli

## Usage

Create codec instance with static methods of `Kasten`.

```ts
import { Kasten } from 'kasten-js';

const data: Uint8Array = ...;

const base64 = Kasten.codecs.base64('rfc4648');

const encoded: string = base64.encode(data);

const decoded: Uint8Array = base64.decode(encoded);

const runLength = Kasten.compressors.runLength('pdf');

const compressed = runLength.compress(data);

const decompressed = runLength.decompress(compressed);
```

If no category specified, returns default implementation.

```ts
import { Kasten } from 'kasten-js';

const base16 = Kasten.codecs.base16();
```

You can get the codec implementations via `Kasten.codecs` property.

You cant get the compressor implementations via `Kasten.compressors` property.

All codecs available in Kasten are below.

|Group|Spec|Method|Category|Summary|
|:-|:-|:-|:-|:-|
|Base 64|RFC2045|`Kasten.codecs.base64`|`rfc-2045`|The old Base 64 specification.|
|Base 64|RFC4648|`Kasten.codecs.base64`|`rfc-4648`|The latest Base 64 specification. It is compatible with `Uint8Array.prototype.toBase64`.|
|Base 64|RFC4648(URL)|`Kasten.codecs.base64`|`rfc-4648-url`|The latest Base 64 specification for URL safe encoding. It is compatible with `Uint8Array.prototype.toBase64`.|
|Base 32|RFC4648|`Kasten.codecs.base32`|`rfc-4648`|The latest Base 32 specification.|
|Base 32|RFC4648 (HEX)|`Kasten.codecs.base32`|`rfc-4648-hex`|The latest Base 32 specification for hexadecimal encoding.|
|Base 16|RFC4648|`Kasten.codecs.base16`|`rfc-4648`|The latest Base 16 specification.|
|Base 16|AsciiHexDecode (PDF1.7)|`Kasten.codecs.base16`|`ascii-hex`|The Base 16 specification of PDF1.7.|
|Base 85|Ascii85Decode (PDF1.7)|`Kasten.codecs.base85`|`ascii-85`|The Base85 specification of PDF1.7.|
|Run-Length|Basic|`Kasten.compressors.runLength`|`basic`|The basic and old Run-Length encoding.|
|Run-Length|PackBits|`Kasten.compressors.runLength`|`pack-bits`|The old Run-Length encoding accepted by [MacPrint of Apple](https://web.archive.org/web/20080705155158/http://developer.apple.com/technotes/tn/tn1023.html).|
|Run-Length|RunLengthDecode (PDF1.7)|`Kasten.compressors.runLength`|`pdf`|The Run-Length specofication of PDF1.7.|

## License

This project is licensed under the MIT License.