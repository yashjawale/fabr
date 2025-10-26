---
editUrl: false
next: false
prev: false
title: "findTemplateBySlug"
---

> **findTemplateBySlug**(`templates`, `slug`): [`Template`](/fabr/docs/api/types/templates/interfaces/template/) \| `undefined`

Defined in: [types/templates.ts:33](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/templates.ts#L33)

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

[`Template`](/fabr/docs/api/types/templates/interfaces/template/) \| `undefined`

The matching template object, or undefined if not found
