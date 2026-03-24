# Kasten : TypeScript Toolbox of Codecs and Cryptgraphies

## Features

- Base 64 Encoding/Decoding
  - RFC2045
  - RFC4648
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

## Linsence

This project is licensed under the MIT License.