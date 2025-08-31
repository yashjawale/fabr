---
title: SubcommandDefinition Type
description: Auto-generated API documentation
---

[**fabr v0.0.1-alpha.0**](../../../README.md)

***

[fabr](../../../README.md) / [types/subcommand](../README.md) / SubcommandDefinition

# Interface: SubcommandDefinition\<T\>

Defined in: [types/subcommand.ts:12](https://github.com/yashjawale/fabr/blob/main/src/types/subcommand.ts#L12)

## Type Parameters

### T

`T` *extends* [`SubcommandArgs`](SubcommandArgs.md) = [`SubcommandArgs`](SubcommandArgs.md)

## Properties

### name

> **name**: `string`

Defined in: [types/subcommand.ts:13](https://github.com/yashjawale/fabr/blob/main/src/types/subcommand.ts#L13)

***

### description

> **description**: `string`

Defined in: [types/subcommand.ts:14](https://github.com/yashjawale/fabr/blob/main/src/types/subcommand.ts#L14)

***

### parseArgs()

> **parseArgs**: (`args`) => `T`

Defined in: [types/subcommand.ts:15](https://github.com/yashjawale/fabr/blob/main/src/types/subcommand.ts#L15)

#### Parameters

##### args

`string`[]

#### Returns

`T`

***

### showHelp()

> **showHelp**: () => `void`

Defined in: [types/subcommand.ts:16](https://github.com/yashjawale/fabr/blob/main/src/types/subcommand.ts#L16)

#### Returns

`void`

***

### execute()

> **execute**: (`templates`, `args`) => `Promise`\<`void`\>

Defined in: [types/subcommand.ts:17](https://github.com/yashjawale/fabr/blob/main/src/types/subcommand.ts#L17)

#### Parameters

##### templates

[`Template`](../../templates/interfaces/Template.md)[]

##### args

`T`

#### Returns

`Promise`\<`void`\>
