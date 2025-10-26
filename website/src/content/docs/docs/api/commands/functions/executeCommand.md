---
editUrl: false
next: false
prev: false
title: "executeCommand"
---

> **executeCommand**(`commandName`, `templates`, `args`): `Promise`\<`void`\>

Defined in: [commands/index.ts:65](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/commands/index.ts#L65)

Execute a command by name with the provided arguments.
Looks up the command in the registry and delegates execution to the appropriate handler.
Shows an error message and exits if the command is not found.

## Parameters

### commandName

`string`

The name of the command to execute

### templates

[`Template`](/fabr/docs/api/types/templates/interfaces/template/)[]

Array of available templates

### args

`string`[]

Command line arguments including the command name

## Returns

`Promise`\<`void`\>

A promise that resolves when the command execution is complete
