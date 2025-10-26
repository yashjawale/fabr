---
editUrl: false
next: false
prev: false
title: "VersionCommand"
---

Defined in: [commands/version.ts:45](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/commands/version.ts#L45)

Show version information for the CLI

## Extends

- [`BaseSubcommand`](/fabr/docs/api/types/subcommand/classes/basesubcommand/)\<`VersionArgs`\>

## Constructors

### Constructor

> **new VersionCommand**(): `VersionCommand`

#### Returns

`VersionCommand`

#### Inherited from

[`BaseSubcommand`](/fabr/docs/api/types/subcommand/classes/basesubcommand/).[`constructor`](/fabr/docs/api/types/subcommand/classes/basesubcommand/#constructor)

## Methods

### execute()

> **execute**(): `Promise`\<`void`\>

Defined in: [commands/version.ts:88](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/commands/version.ts#L88)

Execute the version command.
Displays version information and exits the process.

#### Returns

`Promise`\<`void`\>

A promise that resolves when version is displayed

#### Overrides

[`BaseSubcommand`](/fabr/docs/api/types/subcommand/classes/basesubcommand/).[`execute`](/fabr/docs/api/types/subcommand/classes/basesubcommand/#execute)

***

### handle()

> **handle**(`templates`, `rawArgs`): `Promise`\<`void`\>

Defined in: [types/subcommand.ts:94](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/subcommand.ts#L94)

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

Defined in: [commands/version.ts:73](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/commands/version.ts#L73)

Parse command line arguments for the version command.
Extracts and validates arguments specific to the version command.

#### Parameters

##### rawArgs

`string`[]

Raw command line arguments

#### Returns

[`SubcommandArgs`](/fabr/docs/api/types/subcommand/interfaces/subcommandargs/)

Parsed version command arguments

#### Overrides

[`BaseSubcommand`](/fabr/docs/api/types/subcommand/classes/basesubcommand/).[`parseArgs`](/fabr/docs/api/types/subcommand/classes/basesubcommand/#parseargs)

***

### showHelp()

> **showHelp**(): `void`

Defined in: [types/subcommand.ts:77](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/subcommand.ts#L77)

Show help for this command using the help content configuration.
Uses the getHelpContent() method to format and display help information.

#### Returns

`void`

#### Inherited from

[`BaseSubcommand`](/fabr/docs/api/types/subcommand/classes/basesubcommand/).[`showHelp`](/fabr/docs/api/types/subcommand/classes/basesubcommand/#showhelp)

## Properties

### description

> `readonly` **description**: `"Show version information"` = `'Show version information'`

Defined in: [commands/version.ts:47](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/commands/version.ts#L47)

Command description - must be implemented by subclass.
A brief description of what the command does, used in help text.

#### Overrides

[`BaseSubcommand`](/fabr/docs/api/types/subcommand/classes/basesubcommand/).[`description`](/fabr/docs/api/types/subcommand/classes/basesubcommand/#description)

***

### name

> `readonly` **name**: `"version"` = `'version'`

Defined in: [commands/version.ts:46](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/commands/version.ts#L46)

Command name - must be implemented by subclass.
This should be the string used to invoke the command from the CLI.

#### Overrides

[`BaseSubcommand`](/fabr/docs/api/types/subcommand/classes/basesubcommand/).[`name`](/fabr/docs/api/types/subcommand/classes/basesubcommand/#name)
