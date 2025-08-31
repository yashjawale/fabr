---
title: findAndReplace
description: Auto-generated API documentation
---

[**fabr v0.0.1-alpha.0**](../../../README.md)

***

[fabr](../../../README.md) / [lib/files](../README.md) / findAndReplace

# Function: findAndReplace()

> **findAndReplace**(`projectPath`, `placeholderValues`): `void`

Defined in: [lib/files.ts:40](https://github.com/yashjawale/fabr/blob/main/src/lib/files.ts#L40)

Finds and replaces placeholder values in all files within a directory.
Recursively processes all files in the project directory, searching for placeholder
patterns and replacing them with their corresponding values. Only writes files back
if changes were made to avoid unnecessary disk operations.

## Parameters

### projectPath

`string`

The root path of the project directory to process

### placeholderValues

`Record`\<`string`, `string`\>

An object mapping placeholder keys to their replacement values

## Returns

`void`
