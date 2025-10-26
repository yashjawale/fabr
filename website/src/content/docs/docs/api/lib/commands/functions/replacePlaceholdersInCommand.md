---
editUrl: false
next: false
prev: false
title: "replacePlaceholdersInCommand"
---

> **replacePlaceholdersInCommand**(`command`, `placeholderValues`): `string`

Defined in: [lib/commands.ts:110](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/lib/commands.ts#L110)

Replace placeholders in a command string with their corresponding values.
Searches for placeholder patterns in the format {{PLACEHOLDER_NAME}} and replaces
them with the provided values. Uses global replacement to handle multiple
occurrences of the same placeholder within a command.

## Parameters

### command

`string`

The command string containing placeholder patterns

### placeholderValues

`Record`\<`string`, `string`\>

Mapping of placeholder keys to their replacement values

## Returns

`string`

The processed command string with all placeholders replaced
