---
editUrl: false
next: false
prev: false
title: "parseSubcommandOnlyArgs"
---

> **parseSubcommandOnlyArgs**(`args`): `Omit`\<[`ParsedArgs`](/fabr/docs/api/lib/args/interfaces/parsedargs/), `"command"`\> & `object`

Defined in: [lib/args.ts:91](https://github.com/yashjawale/fabr/blob/af253d796213941a067e07d1a9e8b7372a1ddc07/src/lib/args.ts#L91)

Parse arguments for subcommands, treating all non-flag arguments as positional.
Similar to parseArgs but doesn't distinguish between command and positional arguments.
All non-flag arguments are treated as positional arguments for subcommands.

## Parameters

### args

`string`[]

Array of command line arguments to parse

## Returns

`Omit`\<[`ParsedArgs`](/fabr/docs/api/lib/args/interfaces/parsedargs/), `"command"`\> & `object`

Parsed arguments without command field
