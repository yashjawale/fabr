---
title: API Documentation
description: Auto-generated API documentation
---

[**fabr**](../../../README.md)

***

[fabr](../../../README.md) / [types/fabr-config](../README.md) / isFileBasedTemplate

# Function: isFileBasedTemplate()

> **isFileBasedTemplate**(`config`): `boolean`

Defined in: [types/fabr-config.ts:190](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L190)

Type guard to check if a config is a file-based template.
File-based templates copy and modify files rather than executing commands to generate content.

## Parameters

### config

[`FabrConfig`](../interfaces/FabrConfig.md)

The configuration object to check

## Returns

`boolean`

True if the config is not a command-based template
