---
title: API Documentation
description: Auto-generated API documentation
---

[**fabr**](../../../README.md)

***

[fabr](../../../README.md) / [lib/args](../README.md) / validateProjectName

# Function: validateProjectName()

> **validateProjectName**(`name`): `object`

Defined in: [lib/args.ts:205](https://github.com/yashjawale/fabr/blob/main/src/lib/args.ts#L205)

Validate project name format and provide suggestions if invalid.
Checks for empty names, invalid characters, and length limits.
Returns validation result with optional error message and suggested alternative.

## Parameters

### name

`string`

The project name to validate

## Returns

`object`

Validation result with optional error and suggestion

### valid

> **valid**: `boolean`

### error?

> `optional` **error**: `string`

### suggestion?

> `optional` **suggestion**: `string`
