---
editUrl: false
next: false
prev: false
title: "isFileBasedTemplate"
---

> **isFileBasedTemplate**(`config`): `boolean`

Defined in: [types/fabr-config.ts:190](https://github.com/yashjawale/fabr/blob/f01b72cf78714226de776336ec5f87a5b71f2c78/src/types/fabr-config.ts#L190)

Type guard to check if a config is a file-based template.
File-based templates copy and modify files rather than executing commands to generate content.

## Parameters

### config

[`FabrConfig`](/fabr/docs/api/types/fabr-config/interfaces/fabrconfig/)

The configuration object to check

## Returns

`boolean`

True if the config is not a command-based template
