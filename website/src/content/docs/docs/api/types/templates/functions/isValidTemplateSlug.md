---
editUrl: false
next: false
prev: false
title: "isValidTemplateSlug"
---

> **isValidTemplateSlug**(`templates`, `slug`): `boolean`

Defined in: [types/templates.ts:58](https://github.com/yashjawale/fabr/blob/af253d796213941a067e07d1a9e8b7372a1ddc07/src/types/templates.ts#L58)

Validate that a template slug exists in the templates array.
Checks if any template in the provided array has the specified slug.

## Parameters

### templates

[`Template`](/fabr/docs/api/types/templates/interfaces/template/)[]

Array of templates to check against

### slug

`string`

The slug to validate

## Returns

`boolean`

True if the slug exists in the templates array, false otherwise
