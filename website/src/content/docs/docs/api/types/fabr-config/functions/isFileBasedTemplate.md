---
editUrl: false
next: false
prev: false
title: "isFileBasedTemplate"
---

> **isFileBasedTemplate**(`config`): `boolean`

Defined in: [types/fabr-config.ts:190](https://github.com/yashjawale/fabr/blob/af253d796213941a067e07d1a9e8b7372a1ddc07/src/types/fabr-config.ts#L190)

Type guard to check if a config is a file-based template.
File-based templates copy and modify files rather than executing commands to generate content.

## Parameters

### config

[`FabrConfig`](/fabr/docs/api/types/fabr-config/interfaces/fabrconfig/)

The configuration object to check

## Returns

`boolean`

True if the config is not a command-based template
