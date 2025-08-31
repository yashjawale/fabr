---
title: API Documentation
description: Auto-generated API documentation
---

[**fabr**](../../../README.md)

***

[fabr](../../../README.md) / [lib/args](../README.md) / parseSubcommandOnlyArgs

# Function: parseSubcommandOnlyArgs()

> **parseSubcommandOnlyArgs**(`args`): `Omit`\<[`ParsedArgs`](../interfaces/ParsedArgs.md), `"command"`\> & `object`

Defined in: [lib/args.ts:91](https://github.com/yashjawale/fabr/blob/main/src/lib/args.ts#L91)

Parse arguments for subcommands, treating all non-flag arguments as positional.
Similar to parseArgs but doesn't distinguish between command and positional arguments.
All non-flag arguments are treated as positional arguments for subcommands.

## Parameters

### args

`string`[]

Array of command line arguments to parse

## Returns

`Omit`\<[`ParsedArgs`](../interfaces/ParsedArgs.md), `"command"`\> & `object`

Parsed arguments without command field
