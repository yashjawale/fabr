---
editUrl: false
next: false
prev: false
title: "isFileBasedTemplate"
---

> **isFileBasedTemplate**(`config`): `boolean`

Defined in: [types/fabr-config.ts:190](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/fabr-config.ts#L190)

Type guard to check if a config is a file-based template.
File-based templates copy and modify files rather than executing commands to generate content.

## Parameters

### config

[`FabrConfig`](/fabr/docs/api/types/fabr-config/interfaces/fabrconfig/)

The configuration object to check

## Returns

`boolean`

True if the config is not a command-based template
