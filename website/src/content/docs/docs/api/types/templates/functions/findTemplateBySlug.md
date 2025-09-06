---
editUrl: false
next: false
prev: false
title: "findTemplateBySlug"
---

> **findTemplateBySlug**(`templates`, `slug`): `undefined` \| [`Template`](/fabr/docs/api/types/templates/interfaces/template/)

Defined in: [types/templates.ts:33](https://github.com/yashjawale/fabr/blob/af253d796213941a067e07d1a9e8b7372a1ddc07/src/types/templates.ts#L33)

Find a template by its slug from an array of templates.
Performs a linear search through the templates array to find a matching slug.

## Parameters

### templates

[`Template`](/fabr/docs/api/types/templates/interfaces/template/)[]

Array of templates to search through

### slug

`string`

The slug to search for

## Returns

`undefined` \| [`Template`](/fabr/docs/api/types/templates/interfaces/template/)

The matching template object, or undefined if not found
