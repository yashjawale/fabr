---
editUrl: false
next: false
prev: false
title: "Placeholder"
---

Defined in: [types/fabr-config.ts:33](https://github.com/yashjawale/fabr/blob/f01b72cf78714226de776336ec5f87a5b71f2c78/src/types/fabr-config.ts#L33)

## Properties

### default?

> `optional` **default**: `string`

Defined in: [types/fabr-config.ts:41](https://github.com/yashjawale/fabr/blob/f01b72cf78714226de776336ec5f87a5b71f2c78/src/types/fabr-config.ts#L41)

Default value for this placeholder

***

### defaultCase?

> `optional` **defaultCase**: [`PlaceholderDefaultCase`](/fabr/docs/api/types/fabr-config/interfaces/placeholderdefaultcase/)

Defined in: [types/fabr-config.ts:47](https://github.com/yashjawale/fabr/blob/f01b72cf78714226de776336ec5f87a5b71f2c78/src/types/fabr-config.ts#L47)

Generate a default value by transforming another placeholder

***

### description?

> `optional` **description**: `string`

Defined in: [types/fabr-config.ts:39](https://github.com/yashjawale/fabr/blob/f01b72cf78714226de776336ec5f87a5b71f2c78/src/types/fabr-config.ts#L39)

Additional description or help text for this placeholder

***

### key

> **key**: `string`

Defined in: [types/fabr-config.ts:35](https://github.com/yashjawale/fabr/blob/f01b72cf78714226de776336ec5f87a5b71f2c78/src/types/fabr-config.ts#L35)

The placeholder key (e.g., 'PROJECT_NAME', 'AUTHOR_NAME')

***

### prompt?

> `optional` **prompt**: `string`

Defined in: [types/fabr-config.ts:37](https://github.com/yashjawale/fabr/blob/f01b72cf78714226de776336ec5f87a5b71f2c78/src/types/fabr-config.ts#L37)

The message to show when prompting for this value

***

### required?

> `optional` **required**: `boolean`

Defined in: [types/fabr-config.ts:43](https://github.com/yashjawale/fabr/blob/f01b72cf78714226de776336ec5f87a5b71f2c78/src/types/fabr-config.ts#L43)

Whether this placeholder is required

***

### transform?

> `optional` **transform**: [`PlaceholderTransform`](/fabr/docs/api/types/fabr-config/interfaces/placeholdertransform/)

Defined in: [types/fabr-config.ts:45](https://github.com/yashjawale/fabr/blob/f01b72cf78714226de776336ec5f87a5b71f2c78/src/types/fabr-config.ts#L45)

Transform this placeholder's value from another placeholder

***

### validate?

> `optional` **validate**: [`PlaceholderValidation`](/fabr/docs/api/types/fabr-config/interfaces/placeholdervalidation/)

Defined in: [types/fabr-config.ts:49](https://github.com/yashjawale/fabr/blob/f01b72cf78714226de776336ec5f87a5b71f2c78/src/types/fabr-config.ts#L49)

Validation rules for this placeholder
