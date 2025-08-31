---
title: isPromptedEnvironmentVariable Type
description: Auto-generated API documentation
---

[**fabr v0.0.1-alpha.0**](../../../README.md)

***

[fabr](../../../README.md) / [types/fabr-config](../README.md) / isPromptedEnvironmentVariable

# Function: isPromptedEnvironmentVariable()

> **isPromptedEnvironmentVariable**(`envVar`): `boolean`

Defined in: [types/fabr-config.ts:154](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L154)

Type guard to check if an environment variable is a prompted environment variable.
A prompted environment variable requires user input and is not transformed from a placeholder.

## Parameters

### envVar

[`EnvironmentVariable`](../interfaces/EnvironmentVariable.md)

The environment variable object to check

## Returns

`boolean`

True if the environment variable has a prompt and no transform property
