---
editUrl: false
next: false
prev: false
title: "runShellCommand"
---

> **runShellCommand**(`command`, `spinnerText`): `Promise`\<`void`\>

Defined in: [lib/shell.ts:17](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/lib/shell.ts#L17)

Executes a shell command with a spinner for user feedback.
Supports chaining commands with && operator and provides visual feedback.
Shows a spinner during execution and success/error messages when complete.

## Parameters

### command

The shell command to execute (can include && for chaining). If undefined, the function returns immediately.

`undefined` | `string`

### spinnerText

`string`

The text to display while the command is running

## Returns

`Promise`\<`void`\>

A promise that resolves when the command completes successfully, or rejects on error

## Throws

Throws an error if the command execution fails
