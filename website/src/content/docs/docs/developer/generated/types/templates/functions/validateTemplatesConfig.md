---
title: API Documentation
description: Auto-generated API documentation
---

[**fabr**](../../../README.md)

***

[fabr](../../../README.md) / [types/templates](../README.md) / validateTemplatesConfig

# Function: validateTemplatesConfig()

> **validateTemplatesConfig**(`config`): `config is TemplatesConfig`

Defined in: [types/templates.ts:75](https://github.com/yashjawale/fabr/blob/main/src/types/templates.ts#L75)

Validate templates configuration structure and content.
Performs comprehensive validation of a templates configuration object:
- Validates basic structure and required fields
- Checks template object properties (name, slug, repo)
- Validates slug and repository URL patterns
- Ensures no duplicate slugs exist
- Validates defaultTemplate reference if provided

## Parameters

### config

`unknown`

The configuration object to validate

## Returns

`config is TemplatesConfig`

Type predicate indicating if the config is a valid TemplatesConfig
