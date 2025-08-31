---
description: Auto-generated API documentation
title: "Function: isPromptedPlaceholder()"
---

[**fabr**](../../../README.md)

***

[fabr](../../../README.md) / [types/fabr-config](../README.md) / isPromptedPlaceholder

# Function: isPromptedPlaceholder()

> **isPromptedPlaceholder**(`placeholder`): `boolean`

Defined in: [types/fabr-config.ts:130](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L130)

Type guard to check if a placeholder is a prompted placeholder.
A prompted placeholder is one that requires user input and is not transformed from another placeholder.

## Parameters

### placeholder

[`Placeholder`](../interfaces/Placeholder.md)

The placeholder object to check

## Returns

`boolean`

True if the placeholder has a prompt and no transform property
