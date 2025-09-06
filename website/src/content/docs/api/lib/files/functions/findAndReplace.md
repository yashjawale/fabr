---
editUrl: false
next: false
prev: false
title: "findAndReplace"
---

> **findAndReplace**(`projectPath`, `placeholderValues`): `void`

Defined in: [lib/files.ts:40](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/lib/files.ts#L40)

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
