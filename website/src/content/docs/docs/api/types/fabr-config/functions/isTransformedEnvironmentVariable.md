---
editUrl: false
next: false
prev: false
title: "isTransformedEnvironmentVariable"
---

> **isTransformedEnvironmentVariable**(`envVar`): `boolean`

Defined in: [types/fabr-config.ts:166](https://github.com/yashjawale/fabr/blob/af253d796213941a067e07d1a9e8b7372a1ddc07/src/types/fabr-config.ts#L166)

Type guard to check if an environment variable is a transformed environment variable.
A transformed environment variable derives its value from a placeholder using case transformation.

## Parameters

### envVar

[`EnvironmentVariable`](/fabr/docs/api/types/fabr-config/interfaces/environmentvariable/)

The environment variable object to check

## Returns

`boolean`

True if the environment variable has a transform property
