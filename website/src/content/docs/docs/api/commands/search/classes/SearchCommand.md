---
editUrl: false
next: false
prev: false
title: "SearchCommand"
---

Defined in: [commands/search.ts:16](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/commands/search.ts#L16)

Search through available templates and display matching results

## Extends

- [`BaseSubcommand`](/fabr/docs/api/types/subcommand/classes/basesubcommand/)\<`SearchArgs`\>

## Constructors

### Constructor

> **new SearchCommand**(): `SearchCommand`

#### Returns

`SearchCommand`

#### Inherited from

[`BaseSubcommand`](/fabr/docs/api/types/subcommand/classes/basesubcommand/).[`constructor`](/fabr/docs/api/types/subcommand/classes/basesubcommand/#constructor)

## Methods

### execute()

> **execute**(`templates`, `args`): `Promise`\<`void`\>

Defined in: [commands/search.ts:154](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/commands/search.ts#L154)

Execute the search command.
Performs the search based on provided query and options, then displays results.
Shows appropriate messages for no query, no results, or successful matches.

#### Parameters

##### templates

[`Template`](/fabr/docs/api/types/templates/interfaces/template/)[]

Array of available templates to search through

##### args

`SearchArgs`

Parsed search command arguments

#### Returns

`Promise`\<`void`\>

A promise that resolves when the search is complete

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

> **parseArgs**(`rawArgs`): `SearchArgs`

Defined in: [commands/search.ts:62](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/commands/search.ts#L62)

Parse command line arguments for the search command.
Extracts and validates arguments specific to the search command.

#### Parameters

##### rawArgs

`string`[]

Raw command line arguments

#### Returns

`SearchArgs`

Parsed search command arguments

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

> `readonly` **description**: `"Search templates by name, slug, or repository"` = `'Search templates by name, slug, or repository'`

Defined in: [commands/search.ts:18](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/commands/search.ts#L18)

Command description - must be implemented by subclass.
A brief description of what the command does, used in help text.

#### Overrides

[`BaseSubcommand`](/fabr/docs/api/types/subcommand/classes/basesubcommand/).[`description`](/fabr/docs/api/types/subcommand/classes/basesubcommand/#description)

***

### name

> `readonly` **name**: `"search"` = `'search'`

Defined in: [commands/search.ts:17](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/commands/search.ts#L17)

Command name - must be implemented by subclass.
This should be the string used to invoke the command from the CLI.

#### Overrides

[`BaseSubcommand`](/fabr/docs/api/types/subcommand/classes/basesubcommand/).[`name`](/fabr/docs/api/types/subcommand/classes/basesubcommand/#name)
