---
editUrl: false
next: false
prev: false
title: "HelpCommand"
---

Defined in: [commands/help.ts:52](https://github.com/yashjawale/fabr/blob/f01b72cf78714226de776336ec5f87a5b71f2c78/src/commands/help.ts#L52)

Show help information for the CLI

## Extends

- [`BaseSubcommand`](/fabr/docs/api/types/subcommand/classes/basesubcommand/)\<`HelpArgs`\>

## Constructors

### Constructor

> **new HelpCommand**(): `HelpCommand`

#### Returns

`HelpCommand`

#### Inherited from

[`BaseSubcommand`](/fabr/docs/api/types/subcommand/classes/basesubcommand/).[`constructor`](/fabr/docs/api/types/subcommand/classes/basesubcommand/#constructor)

## Methods

### execute()

> **execute**(): `Promise`\<`void`\>

Defined in: [commands/help.ts:104](https://github.com/yashjawale/fabr/blob/f01b72cf78714226de776336ec5f87a5b71f2c78/src/commands/help.ts#L104)

Execute the command with parsed arguments.
Must be implemented by subclass to provide the command's functionality.

#### Returns

`Promise`\<`void`\>

Promise that resolves when command execution is complete

#### Overrides

[`BaseSubcommand`](/fabr/docs/api/types/subcommand/classes/basesubcommand/).[`execute`](/fabr/docs/api/types/subcommand/classes/basesubcommand/#execute)

***

### handle()

> **handle**(`templates`, `rawArgs`): `Promise`\<`void`\>

Defined in: [types/subcommand.ts:94](https://github.com/yashjawale/fabr/blob/f01b72cf78714226de776336ec5f87a5b71f2c78/src/types/subcommand.ts#L94)

Main handler that follows the common command pattern.
Orchestrates the command execution workflow:
1. Parse arguments
2. Show help if requested (then exit)
3. Execute the command

#### Parameters

##### templates

[`Template`](/fabr/docs/api/types/templates/interfaces/template/)[]

Available templates array

##### rawArgs

`string`[]

Raw command line arguments

#### Returns

`Promise`\<`void`\>

Promise that resolves when command handling is complete

#### Inherited from

[`BaseSubcommand`](/fabr/docs/api/types/subcommand/classes/basesubcommand/).[`handle`](/fabr/docs/api/types/subcommand/classes/basesubcommand/#handle)

***

### parseArgs()

> **parseArgs**(`rawArgs`): [`SubcommandArgs`](/fabr/docs/api/types/subcommand/interfaces/subcommandargs/)

Defined in: [commands/help.ts:80](https://github.com/yashjawale/fabr/blob/f01b72cf78714226de776336ec5f87a5b71f2c78/src/commands/help.ts#L80)

Parse command line arguments for the help command.
Extracts and validates arguments specific to the help command.

#### Parameters

##### rawArgs

`string`[]

Raw command line arguments

#### Returns

[`SubcommandArgs`](/fabr/docs/api/types/subcommand/interfaces/subcommandargs/)

Parsed help command arguments

#### Overrides

[`BaseSubcommand`](/fabr/docs/api/types/subcommand/classes/basesubcommand/).[`parseArgs`](/fabr/docs/api/types/subcommand/classes/basesubcommand/#parseargs)

***

### showHelp()

> **showHelp**(): `void`

Defined in: [commands/help.ts:95](https://github.com/yashjawale/fabr/blob/f01b72cf78714226de776336ec5f87a5b71f2c78/src/commands/help.ts#L95)

Shows the help information specific to the help command.
For the help command, this shows the global help.

#### Returns

`void`

#### Overrides

[`BaseSubcommand`](/fabr/docs/api/types/subcommand/classes/basesubcommand/).[`showHelp`](/fabr/docs/api/types/subcommand/classes/basesubcommand/#showhelp)

## Properties

### description

> `readonly` **description**: `"Show this help message"` = `'Show this help message'`

Defined in: [commands/help.ts:54](https://github.com/yashjawale/fabr/blob/f01b72cf78714226de776336ec5f87a5b71f2c78/src/commands/help.ts#L54)

Command description - must be implemented by subclass.
A brief description of what the command does, used in help text.

#### Overrides

[`BaseSubcommand`](/fabr/docs/api/types/subcommand/classes/basesubcommand/).[`description`](/fabr/docs/api/types/subcommand/classes/basesubcommand/#description)

***

### name

> `readonly` **name**: `"help"` = `'help'`

Defined in: [commands/help.ts:53](https://github.com/yashjawale/fabr/blob/f01b72cf78714226de776336ec5f87a5b71f2c78/src/commands/help.ts#L53)

Command name - must be implemented by subclass.
This should be the string used to invoke the command from the CLI.

#### Overrides

[`BaseSubcommand`](/fabr/docs/api/types/subcommand/classes/basesubcommand/).[`name`](/fabr/docs/api/types/subcommand/classes/basesubcommand/#name)
