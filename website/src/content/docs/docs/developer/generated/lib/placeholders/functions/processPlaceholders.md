---
title: API Documentation
description: Auto-generated API documentation
---

[**fabr**](../../../README.md)

***

[fabr](../../../README.md) / [lib/placeholders](../README.md) / processPlaceholders

# Function: processPlaceholders()

> **processPlaceholders**(`placeholderConfig`): `Promise`\<`Record`\<`string`, `string`\>\>

Defined in: [lib/placeholders.ts:47](https://github.com/yashjawale/fabr/blob/main/src/lib/placeholders.ts#L47)

Processes placeholder configurations to get final values.
Handles both prompted placeholders (requiring user input) and derived placeholders
(transformed from other placeholder values). Processes prompted placeholders first,
then derives transformed placeholders from the collected values.

## Parameters

### placeholderConfig

The array of placeholder configuration objects

`undefined` | [`Placeholder`](../../../types/fabr-config/interfaces/Placeholder.md)[]

## Returns

`Promise`\<`Record`\<`string`, `string`\>\>

A promise resolving to an object mapping placeholder keys to their final values
