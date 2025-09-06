---
editUrl: false
next: false
prev: false
title: "promptForProjectDetails"
---

> **promptForProjectDetails**(`templates`, `providedProjectName?`, `providedTemplate?`): `Promise`\<\{ `projectName`: `string`; `template`: `string`; \}\>

Defined in: [lib/ui.ts:15](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/lib/ui.ts#L15)

Prompts the user for the initial project setup information.
Handles interactive prompting for template selection and project name if not provided.
Uses fuzzy search for template selection and validates project name format.

## Parameters

### templates

[`Template`](/fabr/api/types/templates/interfaces/template/)[]

The list of available templates to choose from

### providedProjectName?

`string`

Pre-provided project name (optional, will prompt if not provided)

### providedTemplate?

`string`

Pre-provided template slug (optional, will prompt if not provided)

## Returns

`Promise`\<\{ `projectName`: `string`; `template`: `string`; \}\>

A promise that resolves to the user's template and project name choices
