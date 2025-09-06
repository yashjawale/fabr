---
editUrl: false
next: false
prev: false
title: "parseArgs"
---

> **parseArgs**(`args`): [`ParsedArgs`](/fabr/api/lib/args/interfaces/parsedargs/)

Defined in: [lib/args.ts:27](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/lib/args.ts#L27)

Parse command line arguments into a structured format.
Handles positional arguments, flags (both long and short), and help flags.
Supports both --key=value and --key formats for long flags.
Supports single-character flags like -h and -t with optional values.

## Parameters

### args

`string`[]

Array of command line arguments to parse

## Returns

[`ParsedArgs`](/fabr/api/lib/args/interfaces/parsedargs/)

Structured object containing command, positional args, flags, and help status
