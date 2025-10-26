---
editUrl: false
next: false
prev: false
title: "isPromptedPlaceholder"
---

> **isPromptedPlaceholder**(`placeholder`): `boolean`

Defined in: [types/fabr-config.ts:130](https://github.com/yashjawale/fabr/blob/f01b72cf78714226de776336ec5f87a5b71f2c78/src/types/fabr-config.ts#L130)

Type guard to check if a placeholder is a prompted placeholder.
A prompted placeholder is one that requires user input and is not transformed from another placeholder.

## Parameters

### placeholder

[`Placeholder`](/fabr/docs/api/types/fabr-config/interfaces/placeholder/)

The placeholder object to check

## Returns

`boolean`

True if the placeholder has a prompt and no transform property
