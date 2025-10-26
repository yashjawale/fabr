---
editUrl: false
next: false
prev: false
title: "parseSubcommandArgs"
---

> **parseSubcommandArgs**(`args`, `commandName`): `string`[]

Defined in: [lib/args.ts:154](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/lib/args.ts#L154)

Generic subcommand argument parser that removes the command name from arguments.
If the first argument matches the command name, it removes it and returns the rest.
This prepares arguments for subcommand-specific parsing.

## Parameters

### args

`string`[]

Original command line arguments

### commandName

`string`

Name of the command to remove from arguments

## Returns

`string`[]

Clean arguments array without the command name
