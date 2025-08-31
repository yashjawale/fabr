---
title: processAndCreateEnvironmentFiles
description: Auto-generated API documentation
---

[**fabr v0.0.1-alpha.0**](../../../README.md)

***

[fabr](../../../README.md) / [lib/env](../README.md) / processAndCreateEnvironmentFiles

# Function: processAndCreateEnvironmentFiles()

> **processAndCreateEnvironmentFiles**(`envVarConfig`, `placeholderValues`, `projectPath`): `Promise`\<`void`\>

Defined in: [lib/env.ts:207](https://github.com/yashjawale/fabr/blob/main/src/lib/env.ts#L207)

Processes environment variables and creates the appropriate .env files.
Combines the processing of environment variable configurations with file creation.
This is a convenience function that handles the complete environment variable workflow.

## Parameters

### envVarConfig

The array of environment variable configurations

`undefined` | [`EnvironmentVariable`](../../../types/fabr-config/interfaces/EnvironmentVariable.md)[]

### placeholderValues

`Record`\<`string`, `string`\>

Existing placeholder values for transformations

### projectPath

`string`

The path to the project directory where .env files will be created

## Returns

`Promise`\<`void`\>

A promise that resolves when environment files are created
