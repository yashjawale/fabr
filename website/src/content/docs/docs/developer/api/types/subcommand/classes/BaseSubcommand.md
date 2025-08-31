---
description: Auto-generated API documentation
title: "Abstract Class: BaseSubcommand<T>"
---

[**fabr**](../../../README.md)

***

[fabr](../../../README.md) / [types/subcommand](../README.md) / BaseSubcommand

# Abstract Class: BaseSubcommand\<T\>

Defined in: [types/subcommand.ts:25](https://github.com/yashjawale/fabr/blob/main/src/types/subcommand.ts#L25)

Base class for implementing subcommands with consistent structure.
Provides a common framework for command parsing, help display, and execution.
Implements the SubcommandDefinition interface with standardized behavior.

## Type Parameters

### T

`T` *extends* [`SubcommandArgs`](../interfaces/SubcommandArgs.md) = [`SubcommandArgs`](../interfaces/SubcommandArgs.md)

## Implements

- [`SubcommandDefinition`](../interfaces/SubcommandDefinition.md)\<`T`\>

## Constructors

### Constructor

> **new BaseSubcommand**\<`T`\>(): `BaseSubcommand`\<`T`\>

#### Returns

`BaseSubcommand`\<`T`\>

## Methods

### parseArgs()

> `abstract` **parseArgs**(`args`): `T`

Defined in: [types/subcommand.ts:58](https://github.com/yashjawale/fabr/blob/main/src/types/subcommand.ts#L58)

Parse command line arguments for this specific command.
Must be implemented by subclass to handle command-specific argument parsing.

#### Parameters

##### args

`string`[]

Raw command line arguments

#### Returns

`T`

Parsed arguments object extending SubcommandArgs

#### Implementation of

[`SubcommandDefinition`](../interfaces/SubcommandDefinition.md).[`parseArgs`](../interfaces/SubcommandDefinition.md#parseargs)

***

### execute()

> `abstract` **execute**(`templates`, `args`): `Promise`\<`void`\>

Defined in: [types/subcommand.ts:69](https://github.com/yashjawale/fabr/blob/main/src/types/subcommand.ts#L69)

Execute the command with parsed arguments.
Must be implemented by subclass to provide the command's functionality.

#### Parameters

##### templates

[`Template`](../../templates/interfaces/Template.md)[]

Available templates array

##### args

`T`

Parsed command arguments

#### Returns

`Promise`\<`void`\>

Promise that resolves when command execution is complete

#### Implementation of

[`SubcommandDefinition`](../interfaces/SubcommandDefinition.md).[`execute`](../interfaces/SubcommandDefinition.md#execute)

***

### showHelp()

> **showHelp**(): `void`

Defined in: [types/subcommand.ts:77](https://github.com/yashjawale/fabr/blob/main/src/types/subcommand.ts#L77)

Show help for this command using the help content configuration.
Uses the getHelpContent() method to format and display help information.

#### Returns

`void`

#### Implementation of

[`SubcommandDefinition`](../interfaces/SubcommandDefinition.md).[`showHelp`](../interfaces/SubcommandDefinition.md#showhelp)

***

### handle()

> **handle**(`templates`, `rawArgs`): `Promise`\<`void`\>

Defined in: [types/subcommand.ts:94](https://github.com/yashjawale/fabr/blob/main/src/types/subcommand.ts#L94)

Main handler that follows the common command pattern.
Orchestrates the command execution workflow:
1. Parse arguments
2. Show help if requested (then exit)
3. Execute the command

#### Parameters

##### templates

[`Template`](../../templates/interfaces/Template.md)[]

Available templates array

##### rawArgs

`string`[]

Raw command line arguments

#### Returns

`Promise`\<`void`\>

Promise that resolves when command handling is complete

## Properties

### name

> `abstract` `readonly` **name**: `string`

Defined in: [types/subcommand.ts:32](https://github.com/yashjawale/fabr/blob/main/src/types/subcommand.ts#L32)

Command name - must be implemented by subclass.
This should be the string used to invoke the command from the CLI.

#### Implementation of

[`SubcommandDefinition`](../interfaces/SubcommandDefinition.md).[`name`](../interfaces/SubcommandDefinition.md#name)

***

### description

> `abstract` `readonly` **description**: `string`

Defined in: [types/subcommand.ts:38](https://github.com/yashjawale/fabr/blob/main/src/types/subcommand.ts#L38)

Command description - must be implemented by subclass.
A brief description of what the command does, used in help text.

#### Implementation of

[`SubcommandDefinition`](../interfaces/SubcommandDefinition.md).[`description`](../interfaces/SubcommandDefinition.md#description)
