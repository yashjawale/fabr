---
editUrl: false
next: false
prev: false
title: "EnvironmentVariable"
---

Defined in: [types/fabr-config.ts:52](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/types/fabr-config.ts#L52)

## Properties

### default?

> `optional` **default**: `string`

Defined in: [types/fabr-config.ts:60](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/types/fabr-config.ts#L60)

Default value for this environment variable

***

### defaultCase?

> `optional` **defaultCase**: [`PlaceholderDefaultCase`](/fabr/api/types/fabr-config/interfaces/placeholderdefaultcase/)

Defined in: [types/fabr-config.ts:68](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/types/fabr-config.ts#L68)

Generate a default value by transforming a placeholder

***

### description?

> `optional` **description**: `string`

Defined in: [types/fabr-config.ts:58](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/types/fabr-config.ts#L58)

Additional description or help text for this environment variable

***

### key

> **key**: `string`

Defined in: [types/fabr-config.ts:54](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/types/fabr-config.ts#L54)

The environment variable name (e.g., 'DATABASE_URL', 'API_KEY')

***

### local?

> `optional` **local**: `boolean`

Defined in: [types/fabr-config.ts:64](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/types/fabr-config.ts#L64)

Whether this should be saved to .env.local instead of .env (for sensitive values)

***

### prompt?

> `optional` **prompt**: `string`

Defined in: [types/fabr-config.ts:56](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/types/fabr-config.ts#L56)

The message to show when prompting for this value

***

### required?

> `optional` **required**: `boolean`

Defined in: [types/fabr-config.ts:62](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/types/fabr-config.ts#L62)

Whether this environment variable is required

***

### transform?

> `optional` **transform**: [`PlaceholderTransform`](/fabr/api/types/fabr-config/interfaces/placeholdertransform/)

Defined in: [types/fabr-config.ts:66](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/types/fabr-config.ts#L66)

Transform this environment variable's value from a placeholder

***

### validate?

> `optional` **validate**: [`PlaceholderValidation`](/fabr/api/types/fabr-config/interfaces/placeholdervalidation/)

Defined in: [types/fabr-config.ts:70](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/types/fabr-config.ts#L70)

Validation rules for this environment variable
