---
description: Auto-generated API documentation
title: "Function: formatHelpContent()"
---

[**fabr**](../../../README.md)

***

[fabr](../../../README.md) / [lib/help](../README.md) / formatHelpContent

# Function: formatHelpContent()

> **formatHelpContent**(`commandName`, `content`): `string`

Defined in: [lib/help.ts:24](https://github.com/yashjawale/fabr/blob/main/src/lib/help.ts#L24)

Format help content into a readable string.
Takes help content configuration and formats it into a structured help message
with sections for usage, description, arguments, options, and examples.
Provides consistent formatting and spacing for command help display.

## Parameters

### commandName

`string`

The name of the command for which help is being formatted

### content

[`HelpContent`](../interfaces/HelpContent.md)

The help content object containing usage, description, etc.

## Returns

`string`

A formatted help string ready for console output
