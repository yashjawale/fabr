---
editUrl: false
next: false
prev: false
title: "isPromptedEnvironmentVariable"
---

> **isPromptedEnvironmentVariable**(`envVar`): `boolean`

Defined in: [types/fabr-config.ts:154](https://github.com/yashjawale/fabr/blob/f01b72cf78714226de776336ec5f87a5b71f2c78/src/types/fabr-config.ts#L154)

Type guard to check if an environment variable is a prompted environment variable.
A prompted environment variable requires user input and is not transformed from a placeholder.

## Parameters

### envVar

[`EnvironmentVariable`](/fabr/docs/api/types/fabr-config/interfaces/environmentvariable/)

The environment variable object to check

## Returns

`boolean`

True if the environment variable has a prompt and no transform property
