---
title: processEnvironmentVariables
description: Auto-generated API documentation
---

[**fabr v0.0.1-alpha.0**](../../../README.md)

***

[fabr](../../../README.md) / [lib/env](../README.md) / processEnvironmentVariables

# Function: processEnvironmentVariables()

> **processEnvironmentVariables**(`envVarConfig`, `placeholderValues`): `Promise`\<\{ `regular`: `Record`\<`string`, `string`\>; `local`: `Record`\<`string`, `string`\>; \}\>

Defined in: [lib/env.ts:55](https://github.com/yashjawale/fabr/blob/main/src/lib/env.ts#L55)

Processes environment variable configurations to get final values.
Handles both prompted environment variables (requiring user input) and transformed
environment variables (derived from placeholder values). Separates variables into
regular (.env) and local (.env.local) categories based on their configuration.

## Parameters

### envVarConfig

The array of environment variable configuration objects

`undefined` | [`EnvironmentVariable`](../../../types/fabr-config/interfaces/EnvironmentVariable.md)[]

### placeholderValues

`Record`\<`string`, `string`\>

Existing placeholder values for transformations

## Returns

`Promise`\<\{ `regular`: `Record`\<`string`, `string`\>; `local`: `Record`\<`string`, `string`\>; \}\>

Object containing regular and local environment variables
