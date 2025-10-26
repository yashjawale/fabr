---
editUrl: false
next: false
prev: false
title: "isCommandBasedTemplate"
---

> **isCommandBasedTemplate**(`config`): `boolean`

Defined in: [types/fabr-config.ts:178](https://github.com/yashjawale/fabr/blob/f01b72cf78714226de776336ec5f87a5b71f2c78/src/types/fabr-config.ts#L178)

Type guard to check if a config is a command-based template.
Command-based templates execute commands to generate files rather than using file copying.

## Parameters

### config

[`FabrConfig`](/fabr/docs/api/types/fabr-config/interfaces/fabrconfig/)

The configuration object to check

## Returns

`boolean`

True if the config is explicitly marked as 'commands' type or has command definitions
