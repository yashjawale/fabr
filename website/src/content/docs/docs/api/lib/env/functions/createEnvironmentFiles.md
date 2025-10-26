---
editUrl: false
next: false
prev: false
title: "createEnvironmentFiles"
---

> **createEnvironmentFiles**(`projectPath`, `regularEnvVars`, `localEnvVars`): `void`

Defined in: [lib/env.ts:162](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/lib/env.ts#L162)

Creates .env and .env.local files with the provided environment variables.
Writes environment variables to appropriate files based on their categorization.
Regular variables go to .env, sensitive/local variables go to .env.local.
Only creates files if there are variables to write.

## Parameters

### projectPath

`string`

The path to the project directory where files will be created

### regularEnvVars

`Record`\<`string`, `string`\>

Environment variables for .env file

### localEnvVars

`Record`\<`string`, `string`\>

Environment variables for .env.local file

## Returns

`void`
