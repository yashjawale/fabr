---
title: API Documentation
description: Auto-generated API documentation
---

[**fabr**](../../../README.md)

***

[fabr](../../../README.md) / [lib/ui](../README.md) / promptForProjectDetails

# Function: promptForProjectDetails()

> **promptForProjectDetails**(`templates`, `providedProjectName?`, `providedTemplate?`): `Promise`\<\{ `template`: `string`; `projectName`: `string`; \}\>

Defined in: [lib/ui.ts:15](https://github.com/yashjawale/fabr/blob/main/src/lib/ui.ts#L15)

Prompts the user for the initial project setup information.
Handles interactive prompting for template selection and project name if not provided.
Uses fuzzy search for template selection and validates project name format.

## Parameters

### templates

[`Template`](../../../types/templates/interfaces/Template.md)[]

The list of available templates to choose from

### providedProjectName?

`string`

Pre-provided project name (optional, will prompt if not provided)

### providedTemplate?

`string`

Pre-provided template slug (optional, will prompt if not provided)

## Returns

`Promise`\<\{ `template`: `string`; `projectName`: `string`; \}\>

A promise that resolves to the user's template and project name choices
