---
editUrl: false
next: false
prev: false
title: "isPromptedPlaceholder"
---

> **isPromptedPlaceholder**(`placeholder`): `boolean`

Defined in: [types/fabr-config.ts:130](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/types/fabr-config.ts#L130)

Type guard to check if a placeholder is a prompted placeholder.
A prompted placeholder is one that requires user input and is not transformed from another placeholder.

## Parameters

### placeholder

[`Placeholder`](/fabr/api/types/fabr-config/interfaces/placeholder/)

The placeholder object to check

## Returns

`boolean`

True if the placeholder has a prompt and no transform property
