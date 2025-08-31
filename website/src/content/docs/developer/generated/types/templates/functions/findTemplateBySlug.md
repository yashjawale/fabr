---
title: findTemplateBySlug Type
description: Auto-generated API documentation
---

[**fabr v0.0.1-alpha.0**](../../../README.md)

***

[fabr](../../../README.md) / [types/templates](../README.md) / findTemplateBySlug

# Function: findTemplateBySlug()

> **findTemplateBySlug**(`templates`, `slug`): `undefined` \| [`Template`](../interfaces/Template.md)

Defined in: [types/templates.ts:33](https://github.com/yashjawale/fabr/blob/main/src/types/templates.ts#L33)

Find a template by its slug from an array of templates.
Performs a linear search through the templates array to find a matching slug.

## Parameters

### templates

[`Template`](../interfaces/Template.md)[]

Array of templates to search through

### slug

`string`

The slug to search for

## Returns

`undefined` \| [`Template`](../interfaces/Template.md)

The matching template object, or undefined if not found
