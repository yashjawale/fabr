---
editUrl: false
next: false
prev: false
title: "isTransformedEnvironmentVariable"
---

> **isTransformedEnvironmentVariable**(`envVar`): `boolean`

Defined in: [types/fabr-config.ts:166](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/fabr-config.ts#L166)

Type guard to check if an environment variable is a transformed environment variable.
A transformed environment variable derives its value from a placeholder using case transformation.

## Parameters

### envVar

[`EnvironmentVariable`](/fabr/docs/api/types/fabr-config/interfaces/environmentvariable/)

The environment variable object to check

## Returns

`boolean`

True if the environment variable has a transform property
