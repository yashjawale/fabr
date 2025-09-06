---
editUrl: false
next: false
prev: false
title: "processPlaceholders"
---

> **processPlaceholders**(`placeholderConfig`): `Promise`\<`Record`\<`string`, `string`\>\>

Defined in: [lib/placeholders.ts:47](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/lib/placeholders.ts#L47)

Processes placeholder configurations to get final values.
Handles both prompted placeholders (requiring user input) and derived placeholders
(transformed from other placeholder values). Processes prompted placeholders first,
then derives transformed placeholders from the collected values.

## Parameters

### placeholderConfig

The array of placeholder configuration objects

`undefined` | [`Placeholder`](/fabr/api/types/fabr-config/interfaces/placeholder/)[]

## Returns

`Promise`\<`Record`\<`string`, `string`\>\>

A promise resolving to an object mapping placeholder keys to their final values
