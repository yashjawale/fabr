---
editUrl: false
next: false
prev: false
title: "formatHelpContent"
---

> **formatHelpContent**(`commandName`, `content`): `string`

Defined in: [lib/help.ts:24](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/lib/help.ts#L24)

Format help content into a readable string.
Takes help content configuration and formats it into a structured help message
with sections for usage, description, arguments, options, and examples.
Provides consistent formatting and spacing for command help display.

## Parameters

### commandName

`string`

The name of the command for which help is being formatted

### content

[`HelpContent`](/fabr/docs/api/lib/help/interfaces/helpcontent/)

The help content object containing usage, description, etc.

## Returns

`string`

A formatted help string ready for console output
