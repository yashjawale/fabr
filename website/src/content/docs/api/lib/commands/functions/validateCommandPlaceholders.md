---
editUrl: false
next: false
prev: false
title: "validateCommandPlaceholders"
---

> **validateCommandPlaceholders**(`commands`, `placeholderValues`): `string`[]

Defined in: [lib/commands.ts:136](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/lib/commands.ts#L136)

Validate that all placeholders in commands have corresponding values.
Scans all command templates for placeholder patterns and checks if each
placeholder has a corresponding value in the provided placeholder values.
Returns a list of missing placeholder keys that need to be resolved.

## Parameters

### commands

[`CommandTemplate`](/fabr/api/types/fabr-config/interfaces/commandtemplate/)[]

Array of command templates to validate

### placeholderValues

`Record`\<`string`, `string`\>

Available placeholder values

## Returns

`string`[]

Array of placeholder keys that are missing values
