---
description: Auto-generated API documentation
title: "Interface: Placeholder"
---

[**fabr**](../../../README.md)

***

[fabr](../../../README.md) / [types/fabr-config](../README.md) / Placeholder

# Interface: Placeholder

Defined in: [types/fabr-config.ts:33](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L33)

## Properties

### key

> **key**: `string`

Defined in: [types/fabr-config.ts:35](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L35)

The placeholder key (e.g., 'PROJECT_NAME', 'AUTHOR_NAME')

***

### prompt?

> `optional` **prompt**: `string`

Defined in: [types/fabr-config.ts:37](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L37)

The message to show when prompting for this value

***

### description?

> `optional` **description**: `string`

Defined in: [types/fabr-config.ts:39](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L39)

Additional description or help text for this placeholder

***

### default?

> `optional` **default**: `string`

Defined in: [types/fabr-config.ts:41](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L41)

Default value for this placeholder

***

### required?

> `optional` **required**: `boolean`

Defined in: [types/fabr-config.ts:43](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L43)

Whether this placeholder is required

***

### transform?

> `optional` **transform**: [`PlaceholderTransform`](PlaceholderTransform.md)

Defined in: [types/fabr-config.ts:45](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L45)

Transform this placeholder's value from another placeholder

***

### defaultCase?

> `optional` **defaultCase**: [`PlaceholderDefaultCase`](PlaceholderDefaultCase.md)

Defined in: [types/fabr-config.ts:47](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L47)

Generate a default value by transforming another placeholder

***

### validate?

> `optional` **validate**: [`PlaceholderValidation`](PlaceholderValidation.md)

Defined in: [types/fabr-config.ts:49](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L49)

Validation rules for this placeholder
