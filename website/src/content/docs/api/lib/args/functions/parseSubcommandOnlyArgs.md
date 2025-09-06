---
editUrl: false
next: false
prev: false
title: "parseSubcommandOnlyArgs"
---

> **parseSubcommandOnlyArgs**(`args`): `Omit`\<[`ParsedArgs`](/fabr/api/lib/args/interfaces/parsedargs/), `"command"`\> & `object`

Defined in: [lib/args.ts:91](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/lib/args.ts#L91)

Parse arguments for subcommands, treating all non-flag arguments as positional.
Similar to parseArgs but doesn't distinguish between command and positional arguments.
All non-flag arguments are treated as positional arguments for subcommands.

## Parameters

### args

`string`[]

Array of command line arguments to parse

## Returns

`Omit`\<[`ParsedArgs`](/fabr/api/lib/args/interfaces/parsedargs/), `"command"`\> & `object`

Parsed arguments without command field
