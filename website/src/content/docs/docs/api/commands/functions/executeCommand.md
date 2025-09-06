---
editUrl: false
next: false
prev: false
title: "executeCommand"
---

> **executeCommand**(`commandName`, `templates`, `args`): `Promise`\<`void`\>

Defined in: [commands/index.ts:51](https://github.com/yashjawale/fabr/blob/af253d796213941a067e07d1a9e8b7372a1ddc07/src/commands/index.ts#L51)

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
