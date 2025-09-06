---
editUrl: false
next: false
prev: false
title: "ListCommand"
---

Defined in: [commands/list.ts:12](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/commands/list.ts#L12)

List all available templates with their details

## Extends

- [`BaseSubcommand`](/fabr/api/types/subcommand/classes/basesubcommand/)\<`ListArgs`\>

## Constructors

### Constructor

> **new ListCommand**(): `ListCommand`

#### Returns

`ListCommand`

#### Inherited from

[`BaseSubcommand`](/fabr/api/types/subcommand/classes/basesubcommand/).[`constructor`](/fabr/api/types/subcommand/classes/basesubcommand/#constructor)

## Properties

### description

> `readonly` **description**: `"List all available templates"` = `'List all available templates'`

Defined in: [commands/list.ts:14](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/commands/list.ts#L14)

Command description - must be implemented by subclass.
A brief description of what the command does, used in help text.

#### Overrides

[`BaseSubcommand`](/fabr/api/types/subcommand/classes/basesubcommand/).[`description`](/fabr/api/types/subcommand/classes/basesubcommand/#description)

***

### name

> `readonly` **name**: `"list"` = `'list'`

Defined in: [commands/list.ts:13](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/commands/list.ts#L13)

Command name - must be implemented by subclass.
This should be the string used to invoke the command from the CLI.

#### Overrides

[`BaseSubcommand`](/fabr/api/types/subcommand/classes/basesubcommand/).[`name`](/fabr/api/types/subcommand/classes/basesubcommand/#name)

## Methods

### execute()

> **execute**(`templates`): `Promise`\<`void`\>

Defined in: [commands/list.ts:61](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/commands/list.ts#L61)

Execute the list command.
Displays all available templates with their names, slugs, and repositories.
Shows a count of total templates at the end.

#### Parameters

##### templates

[`Template`](/fabr/api/types/templates/interfaces/template/)[]

Array of available templates to display

#### Returns

`Promise`\<`void`\>

A promise that resolves when the template list is displayed

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

Defined in: [commands/list.ts:43](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/commands/list.ts#L43)

Parse command line arguments for the list command.
Extracts and validates arguments specific to the list command.

#### Parameters

##### rawArgs

`string`[]

Raw command line arguments

#### Returns

[`SubcommandArgs`](/fabr/api/types/subcommand/interfaces/subcommandargs/)

Parsed list command arguments

#### Overrides

[`BaseSubcommand`](/fabr/api/types/subcommand/classes/basesubcommand/).[`parseArgs`](/fabr/api/types/subcommand/classes/basesubcommand/#parseargs)

***

### showHelp()

> **showHelp**(): `void`

Defined in: [types/subcommand.ts:77](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/types/subcommand.ts#L77)

Show help for this command using the help content configuration.
Uses the getHelpContent() method to format and display help information.

#### Returns

`void`

#### Inherited from

[`BaseSubcommand`](/fabr/api/types/subcommand/classes/basesubcommand/).[`showHelp`](/fabr/api/types/subcommand/classes/basesubcommand/#showhelp)
