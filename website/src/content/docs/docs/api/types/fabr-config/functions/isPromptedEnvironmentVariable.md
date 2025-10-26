---
editUrl: false
next: false
prev: false
title: "isPromptedEnvironmentVariable"
---

> **isPromptedEnvironmentVariable**(`envVar`): `boolean`

Defined in: [types/fabr-config.ts:154](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/fabr-config.ts#L154)

Type guard to check if an environment variable is a prompted environment variable.
A prompted environment variable requires user input and is not transformed from a placeholder.

## Parameters

### envVar

[`EnvironmentVariable`](/fabr/docs/api/types/fabr-config/interfaces/environmentvariable/)

The environment variable object to check

## Returns

`boolean`

True if the environment variable has a prompt and no transform property
