---
description: Auto-generated API documentation
title: "Function: validateCommandPlaceholders()"
---

[**fabr**](../../../README.md)

***

[fabr](../../../README.md) / [lib/commands](../README.md) / validateCommandPlaceholders

# Function: validateCommandPlaceholders()

> **validateCommandPlaceholders**(`commands`, `placeholderValues`): `string`[]

Defined in: [lib/commands.ts:136](https://github.com/yashjawale/fabr/blob/main/src/lib/commands.ts#L136)

Validate that all placeholders in commands have corresponding values.
Scans all command templates for placeholder patterns and checks if each
placeholder has a corresponding value in the provided placeholder values.
Returns a list of missing placeholder keys that need to be resolved.

## Parameters

### commands

[`CommandTemplate`](../../../types/fabr-config/interfaces/CommandTemplate.md)[]

Array of command templates to validate

### placeholderValues

`Record`\<`string`, `string`\>

Available placeholder values

## Returns

`string`[]

Array of placeholder keys that are missing values
