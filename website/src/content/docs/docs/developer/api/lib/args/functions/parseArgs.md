---
description: Auto-generated API documentation
title: "Function: parseArgs()"
---

[**fabr**](../../../README.md)

***

[fabr](../../../README.md) / [lib/args](../README.md) / parseArgs

# Function: parseArgs()

> **parseArgs**(`args`): [`ParsedArgs`](../interfaces/ParsedArgs.md)

Defined in: [lib/args.ts:27](https://github.com/yashjawale/fabr/blob/main/src/lib/args.ts#L27)

Parse command line arguments into a structured format.
Handles positional arguments, flags (both long and short), and help flags.
Supports both --key=value and --key formats for long flags.
Supports single-character flags like -h and -t with optional values.

## Parameters

### args

`string`[]

Array of command line arguments to parse

## Returns

[`ParsedArgs`](../interfaces/ParsedArgs.md)

Structured object containing command, positional args, flags, and help status
