---
editUrl: false
next: false
prev: false
title: "SubcommandDefinition"
---

Defined in: [types/subcommand.ts:12](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/subcommand.ts#L12)

## Type Parameters

### T

`T` *extends* [`SubcommandArgs`](/fabr/docs/api/types/subcommand/interfaces/subcommandargs/) = [`SubcommandArgs`](/fabr/docs/api/types/subcommand/interfaces/subcommandargs/)

## Properties

### description

> **description**: `string`

Defined in: [types/subcommand.ts:14](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/subcommand.ts#L14)

***

### execute()

> **execute**: (`templates`, `args`) => `Promise`\<`void`\>

Defined in: [types/subcommand.ts:17](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/subcommand.ts#L17)

#### Parameters

##### templates

[`Template`](/fabr/docs/api/types/templates/interfaces/template/)[]

##### args

`T`

#### Returns

`Promise`\<`void`\>

***

### name

> **name**: `string`

Defined in: [types/subcommand.ts:13](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/subcommand.ts#L13)

***

### parseArgs()

> **parseArgs**: (`args`) => `T`

Defined in: [types/subcommand.ts:15](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/subcommand.ts#L15)

#### Parameters

##### args

`string`[]

#### Returns

`T`

***

### showHelp()

> **showHelp**: () => `void`

Defined in: [types/subcommand.ts:16](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/subcommand.ts#L16)

#### Returns

`void`
