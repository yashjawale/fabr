---
editUrl: false
next: false
prev: false
title: "isFileBasedTemplate"
---

> **isFileBasedTemplate**(`config`): `boolean`

Defined in: [types/fabr-config.ts:190](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/types/fabr-config.ts#L190)

Type guard to check if a config is a file-based template.
File-based templates copy and modify files rather than executing commands to generate content.

## Parameters

### config

[`FabrConfig`](/fabr/api/types/fabr-config/interfaces/fabrconfig/)

The configuration object to check

## Returns

`boolean`

True if the config is not a command-based template
