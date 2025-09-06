---
editUrl: false
next: false
prev: false
title: "HelpCommand"
---

Defined in: [commands/help.ts:42](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/commands/help.ts#L42)

Show help information for the CLI

## Extends

- [`BaseSubcommand`](/fabr/api/types/subcommand/classes/basesubcommand/)\<`HelpArgs`\>

## Constructors

### Constructor

> **new HelpCommand**(): `HelpCommand`

#### Returns

`HelpCommand`

#### Inherited from

[`BaseSubcommand`](/fabr/api/types/subcommand/classes/basesubcommand/).[`constructor`](/fabr/api/types/subcommand/classes/basesubcommand/#constructor)

## Properties

### description

> `readonly` **description**: `"Show this help message"` = `'Show this help message'`

Defined in: [commands/help.ts:44](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/commands/help.ts#L44)

Command description - must be implemented by subclass.
A brief description of what the command does, used in help text.

#### Overrides

[`BaseSubcommand`](/fabr/api/types/subcommand/classes/basesubcommand/).[`description`](/fabr/api/types/subcommand/classes/basesubcommand/#description)

***

### name

> `readonly` **name**: `"help"` = `'help'`

Defined in: [commands/help.ts:43](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/commands/help.ts#L43)

Command name - must be implemented by subclass.
This should be the string used to invoke the command from the CLI.

#### Overrides

[`BaseSubcommand`](/fabr/api/types/subcommand/classes/basesubcommand/).[`name`](/fabr/api/types/subcommand/classes/basesubcommand/#name)

## Methods

### execute()

> **execute**(): `Promise`\<`void`\>

Defined in: [commands/help.ts:94](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/commands/help.ts#L94)

Execute the command with parsed arguments.
Must be implemented by subclass to provide the command's functionality.

#### Returns

`Promise`\<`void`\>

Promise that resolves when command execution is complete

#### Overrides

[`BaseSubcommand`](/fabr/api/types/subcommand/classes/basesubcommand/).[`execute`](/fabr/api/types/subcommand/classes/basesubcommand/#execute)

***

### handle()

> **handle**(`templates`, `rawArgs`): `Promise`\<`void`\>

Defined in: [types/subcommand.ts:94](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/types/subcommand.ts#L94)

Main handler that follows the common command pattern.
Orchestrates the command execution workflow:
1. Parse arguments
2. Show help if requested (then exit)
3. Execute the command

#### Parameters

##### templates

[`Template`](/fabr/api/types/templates/interfaces/template/)[]

Available templates array

##### rawArgs

`string`[]

Raw command line arguments

#### Returns

`Promise`\<`void`\>

Promise that resolves when command handling is complete

#### Inherited from

[`BaseSubcommand`](/fabr/api/types/subcommand/classes/basesubcommand/).[`handle`](/fabr/api/types/subcommand/classes/basesubcommand/#handle)

***

### parseArgs()

> **parseArgs**(`rawArgs`): [`SubcommandArgs`](/fabr/api/types/subcommand/interfaces/subcommandargs/)

Defined in: [commands/help.ts:70](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/commands/help.ts#L70)

Parse command line arguments for the help command.
Extracts and validates arguments specific to the help command.

#### Parameters

##### rawArgs

`string`[]

Raw command line arguments

#### Returns

[`SubcommandArgs`](/fabr/api/types/subcommand/interfaces/subcommandargs/)

Parsed help command arguments

#### Overrides

[`BaseSubcommand`](/fabr/api/types/subcommand/classes/basesubcommand/).[`parseArgs`](/fabr/api/types/subcommand/classes/basesubcommand/#parseargs)

***

### showHelp()

> **showHelp**(): `void`

Defined in: [commands/help.ts:85](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/commands/help.ts#L85)

Shows the help information specific to the help command.
For the help command, this shows the global help.

#### Returns

`void`

#### Overrides

[`BaseSubcommand`](/fabr/api/types/subcommand/classes/basesubcommand/).[`showHelp`](/fabr/api/types/subcommand/classes/basesubcommand/#showhelp)
