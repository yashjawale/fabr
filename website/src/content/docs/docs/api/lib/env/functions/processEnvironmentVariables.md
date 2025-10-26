---
editUrl: false
next: false
prev: false
title: "processEnvironmentVariables"
---

> **processEnvironmentVariables**(`envVarConfig`, `placeholderValues`): `Promise`\<\{ `local`: `Record`\<`string`, `string`\>; `regular`: `Record`\<`string`, `string`\>; \}\>

Defined in: [lib/env.ts:55](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/lib/env.ts#L55)

Processes environment variable configurations to get final values.
Handles both prompted environment variables (requiring user input) and transformed
environment variables (derived from placeholder values). Separates variables into
regular (.env) and local (.env.local) categories based on their configuration.

## Parameters

### envVarConfig

The array of environment variable configuration objects

[`EnvironmentVariable`](/fabr/docs/api/types/fabr-config/interfaces/environmentvariable/)[] | `undefined`

### placeholderValues

`Record`\<`string`, `string`\>

Existing placeholder values for transformations

## Returns

`Promise`\<\{ `local`: `Record`\<`string`, `string`\>; `regular`: `Record`\<`string`, `string`\>; \}\>

Object containing regular and local environment variables
