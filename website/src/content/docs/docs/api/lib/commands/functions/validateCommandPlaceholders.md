---
editUrl: false
next: false
prev: false
title: "validateCommandPlaceholders"
---

> **validateCommandPlaceholders**(`commands`, `placeholderValues`): `string`[]

Defined in: [lib/commands.ts:136](https://github.com/yashjawale/fabr/blob/af253d796213941a067e07d1a9e8b7372a1ddc07/src/lib/commands.ts#L136)

Validate that all placeholders in commands have corresponding values.
Scans all command templates for placeholder patterns and checks if each
placeholder has a corresponding value in the provided placeholder values.
Returns a list of missing placeholder keys that need to be resolved.

## Parameters

### commands

[`CommandTemplate`](/fabr/docs/api/types/fabr-config/interfaces/commandtemplate/)[]

Array of command templates to validate

### placeholderValues

`Record`\<`string`, `string`\>

Available placeholder values

## Returns

`string`[]

Array of placeholder keys that are missing values
