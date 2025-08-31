---
title: API Documentation
description: Auto-generated API documentation
---

[**fabr**](../../../README.md)

***

[fabr](../../../README.md) / [types/templates](../README.md) / TemplatesConfig

# Interface: TemplatesConfig

Defined in: [types/templates.ts:15](https://github.com/yashjawale/fabr/blob/main/src/types/templates.ts#L15)

## Properties

### $schema?

> `optional` **$schema**: `string`

Defined in: [types/templates.ts:17](https://github.com/yashjawale/fabr/blob/main/src/types/templates.ts#L17)

JSON Schema reference

***

### templates

> **templates**: [`Template`](Template.md)[]

Defined in: [types/templates.ts:19](https://github.com/yashjawale/fabr/blob/main/src/types/templates.ts#L19)

Array of available project templates

***

### defaultTemplate?

> `optional` **defaultTemplate**: `string`

Defined in: [types/templates.ts:21](https://github.com/yashjawale/fabr/blob/main/src/types/templates.ts#L21)

The default template to select (must match a template slug)
