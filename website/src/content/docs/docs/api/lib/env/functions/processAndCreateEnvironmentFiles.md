---
editUrl: false
next: false
prev: false
title: "processAndCreateEnvironmentFiles"
---

> **processAndCreateEnvironmentFiles**(`envVarConfig`, `placeholderValues`, `projectPath`): `Promise`\<`void`\>

Defined in: [lib/env.ts:207](https://github.com/yashjawale/fabr/blob/f01b72cf78714226de776336ec5f87a5b71f2c78/src/lib/env.ts#L207)

Processes environment variables and creates the appropriate .env files.
Combines the processing of environment variable configurations with file creation.
This is a convenience function that handles the complete environment variable workflow.

## Parameters

### envVarConfig

The array of environment variable configurations

`undefined` | [`EnvironmentVariable`](/fabr/docs/api/types/fabr-config/interfaces/environmentvariable/)[]

### placeholderValues

`Record`\<`string`, `string`\>

Existing placeholder values for transformations

### projectPath

`string`

The path to the project directory where .env files will be created

## Returns

`Promise`\<`void`\>

A promise that resolves when environment files are created
