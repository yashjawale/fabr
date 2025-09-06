---
editUrl: false
next: false
prev: false
title: "processEnvironmentVariables"
---

> **processEnvironmentVariables**(`envVarConfig`, `placeholderValues`): `Promise`\<\{ `local`: `Record`\<`string`, `string`\>; `regular`: `Record`\<`string`, `string`\>; \}\>

Defined in: [lib/env.ts:55](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/lib/env.ts#L55)

Processes environment variable configurations to get final values.
Handles both prompted environment variables (requiring user input) and transformed
environment variables (derived from placeholder values). Separates variables into
regular (.env) and local (.env.local) categories based on their configuration.

## Parameters

### envVarConfig

The array of environment variable configuration objects

`undefined` | [`EnvironmentVariable`](/fabr/api/types/fabr-config/interfaces/environmentvariable/)[]

### placeholderValues

`Record`\<`string`, `string`\>

Existing placeholder values for transformations

## Returns

`Promise`\<\{ `local`: `Record`\<`string`, `string`\>; `regular`: `Record`\<`string`, `string`\>; \}\>

Object containing regular and local environment variables
