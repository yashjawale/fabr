---
editUrl: false
next: false
prev: false
title: "parseArgs"
---

> **parseArgs**(`args`): [`ParsedArgs`](/fabr/docs/api/lib/args/interfaces/parsedargs/)

Defined in: [lib/args.ts:27](https://github.com/yashjawale/fabr/blob/f01b72cf78714226de776336ec5f87a5b71f2c78/src/lib/args.ts#L27)

Parse command line arguments into a structured format.
Handles positional arguments, flags (both long and short), and help flags.
Supports both --key=value and --key formats for long flags.
Supports single-character flags like -h and -t with optional values.

## Parameters

### args

`string`[]

Array of command line arguments to parse

## Returns

[`ParsedArgs`](/fabr/docs/api/lib/args/interfaces/parsedargs/)

Structured object containing command, positional args, flags, and help status
