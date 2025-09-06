---
editUrl: false
next: false
prev: false
title: "findAndReplace"
---

> **findAndReplace**(`projectPath`, `placeholderValues`): `void`

Defined in: [lib/files.ts:40](https://github.com/yashjawale/fabr/blob/af253d796213941a067e07d1a9e8b7372a1ddc07/src/lib/files.ts#L40)

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
