---
description: Auto-generated API documentation
title: "Function: slugifyProjectName()"
---

[**fabr**](../../../README.md)

***

[fabr](../../../README.md) / [lib/args](../README.md) / slugifyProjectName

# Function: slugifyProjectName()

> **slugifyProjectName**(`name`): `string`

Defined in: [lib/args.ts:176](https://github.com/yashjawale/fabr/blob/main/src/lib/args.ts#L176)

Convert a string to a valid project name slug.
Applies multiple transformations to ensure the name is suitable for directory/project names:
- Converts to lowercase
- Replaces spaces with hyphens
- Removes invalid characters (keeps only letters, numbers, hyphens, underscores)
- Removes consecutive hyphens
- Removes leading/trailing hyphens
- Truncates to 100 characters

## Parameters

### name

`string`

The original project name to slugify

## Returns

`string`

A valid project name slug
