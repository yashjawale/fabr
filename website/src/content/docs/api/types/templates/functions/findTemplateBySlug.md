---
editUrl: false
next: false
prev: false
title: "findTemplateBySlug"
---

> **findTemplateBySlug**(`templates`, `slug`): `undefined` \| [`Template`](/fabr/api/types/templates/interfaces/template/)

Defined in: [types/templates.ts:33](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/types/templates.ts#L33)

Find a template by its slug from an array of templates.
Performs a linear search through the templates array to find a matching slug.

## Parameters

### templates

[`Template`](/fabr/api/types/templates/interfaces/template/)[]

Array of templates to search through

### slug

`string`

The slug to search for

## Returns

`undefined` \| [`Template`](/fabr/api/types/templates/interfaces/template/)

The matching template object, or undefined if not found
