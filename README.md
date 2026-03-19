# Kasten : TypeScript Toolbox of Codecs and Cryptgraphies

## Features

- Base64 Encoding/Decoding
- Base32 Encoding/Decoding (WIP)

## Usage

Create codec instance with static methods of `Kasten`.

```ts
const data: Uint8Array = ...;

const base64 = Kasten.base64('rfc4648');

const encoded: string = base64.encode(data);
```

## Linsence

This project is licensed under the MIT License.