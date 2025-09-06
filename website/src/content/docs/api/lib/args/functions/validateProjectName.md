---
editUrl: false
next: false
prev: false
title: "validateProjectName"
---

> **validateProjectName**(`name`): `object`

Defined in: [lib/args.ts:205](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/lib/args.ts#L205)

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

### error?

> `optional` **error**: `string`

### suggestion?

> `optional` **suggestion**: `string`

### valid

> **valid**: `boolean`
