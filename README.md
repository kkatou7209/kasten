# Kasten : TypeScript Toolbox of Codecs and Cryptgraphies

## Features

- Base 64 Encoding/Decoding
- Base 32 Encoding/Decoding
- Base 16 Encoding/Decoding
- Run-Length Encoding/Decoding (WIP)
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