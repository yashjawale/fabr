---
title: API Documentation
description: Auto-generated API documentation
---

[**fabr**](../../../README.md)

***

[fabr](../../../README.md) / [types/templates](../README.md) / isValidTemplateSlug

# Function: isValidTemplateSlug()

> **isValidTemplateSlug**(`templates`, `slug`): `boolean`

Defined in: [types/templates.ts:58](https://github.com/yashjawale/fabr/blob/main/src/types/templates.ts#L58)

Validate that a template slug exists in the templates array.
Checks if any template in the provided array has the specified slug.

## Parameters

### templates

[`Template`](../interfaces/Template.md)[]

Array of templates to check against

### slug

`string`

The slug to validate

## Returns

`boolean`

True if the slug exists in the templates array, false otherwise
