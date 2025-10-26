---
editUrl: false
next: false
prev: false
title: "isPromptedPlaceholder"
---

> **isPromptedPlaceholder**(`placeholder`): `boolean`

Defined in: [types/fabr-config.ts:130](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/fabr-config.ts#L130)

Type guard to check if a placeholder is a prompted placeholder.
A prompted placeholder is one that requires user input and is not transformed from another placeholder.

## Parameters

### placeholder

[`Placeholder`](/fabr/docs/api/types/fabr-config/interfaces/placeholder/)

The placeholder object to check

## Returns

`boolean`

True if the placeholder has a prompt and no transform property
