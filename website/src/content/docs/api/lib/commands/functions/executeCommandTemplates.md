---
editUrl: false
next: false
prev: false
title: "executeCommandTemplates"
---

> **executeCommandTemplates**(`commands`, `placeholderValues`, `projectPath`): `Promise`\<`void`\>

Defined in: [lib/commands.ts:41](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/lib/commands.ts#L41)

Execute a list of command templates with placeholder replacement.
Processes each command template by replacing placeholders with their values,
executing commands in their specified working directories, and providing
progress feedback. Supports both visible output and silent execution modes.

## Parameters

### commands

[`CommandTemplate`](/fabr/api/types/fabr-config/interfaces/commandtemplate/)[]

Array of command templates to execute

### placeholderValues

`Record`\<`string`, `string`\>

Mapping of placeholder keys to their values

### projectPath

`string`

The base project path for relative working directories

## Returns

`Promise`\<`void`\>

A promise that resolves when all commands complete successfully

## Throws

Throws an error if any command execution fails
