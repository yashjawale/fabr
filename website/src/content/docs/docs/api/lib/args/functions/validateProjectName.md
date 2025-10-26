---
editUrl: false
next: false
prev: false
title: "validateProjectName"
---

> **validateProjectName**(`name`): `object`

Defined in: [lib/args.ts:205](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/lib/args.ts#L205)

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
