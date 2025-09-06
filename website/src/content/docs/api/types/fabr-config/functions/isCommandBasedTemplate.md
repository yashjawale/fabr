---
editUrl: false
next: false
prev: false
title: "isCommandBasedTemplate"
---

> **isCommandBasedTemplate**(`config`): `boolean`

Defined in: [types/fabr-config.ts:178](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/types/fabr-config.ts#L178)

Type guard to check if a config is a command-based template.
Command-based templates execute commands to generate files rather than using file copying.

## Parameters

### config

[`FabrConfig`](/fabr/api/types/fabr-config/interfaces/fabrconfig/)

The configuration object to check

## Returns

`boolean`

True if the config is explicitly marked as 'commands' type or has command definitions
