---
title: API Documentation
description: Auto-generated API documentation
---

[**fabr**](../../../README.md)

***

[fabr](../../../README.md) / [types/fabr-config](../README.md) / isTransformedEnvironmentVariable

# Function: isTransformedEnvironmentVariable()

> **isTransformedEnvironmentVariable**(`envVar`): `boolean`

Defined in: [types/fabr-config.ts:166](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L166)

Type guard to check if an environment variable is a transformed environment variable.
A transformed environment variable derives its value from a placeholder using case transformation.

## Parameters

### envVar

[`EnvironmentVariable`](../interfaces/EnvironmentVariable.md)

The environment variable object to check

## Returns

`boolean`

True if the environment variable has a transform property
