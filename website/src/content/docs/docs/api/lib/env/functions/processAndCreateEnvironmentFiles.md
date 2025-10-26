---
editUrl: false
next: false
prev: false
title: "processAndCreateEnvironmentFiles"
---

> **processAndCreateEnvironmentFiles**(`envVarConfig`, `placeholderValues`, `projectPath`): `Promise`\<`void`\>

Defined in: [lib/env.ts:207](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/lib/env.ts#L207)

Processes environment variables and creates the appropriate .env files.
Combines the processing of environment variable configurations with file creation.
This is a convenience function that handles the complete environment variable workflow.

## Parameters

### envVarConfig

The array of environment variable configurations

[`EnvironmentVariable`](/fabr/docs/api/types/fabr-config/interfaces/environmentvariable/)[] | `undefined`

### placeholderValues

`Record`\<`string`, `string`\>

Existing placeholder values for transformations

### projectPath

`string`

The path to the project directory where .env files will be created

## Returns

`Promise`\<`void`\>

A promise that resolves when environment files are created
