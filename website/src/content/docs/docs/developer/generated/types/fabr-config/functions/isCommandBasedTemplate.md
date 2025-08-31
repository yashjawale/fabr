---
title: API Documentation
description: Auto-generated API documentation
---

[**fabr**](../../../README.md)

***

[fabr](../../../README.md) / [types/fabr-config](../README.md) / isCommandBasedTemplate

# Function: isCommandBasedTemplate()

> **isCommandBasedTemplate**(`config`): `boolean`

Defined in: [types/fabr-config.ts:178](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L178)

Type guard to check if a config is a command-based template.
Command-based templates execute commands to generate files rather than using file copying.

## Parameters

### config

[`FabrConfig`](../interfaces/FabrConfig.md)

The configuration object to check

## Returns

`boolean`

True if the config is explicitly marked as 'commands' type or has command definitions
