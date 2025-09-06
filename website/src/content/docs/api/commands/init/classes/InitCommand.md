---
editUrl: false
next: false
prev: false
title: "InitCommand"
---

Defined in: [commands/init.ts:30](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/commands/init.ts#L30)

Create a new project from a template

## Extends

- [`BaseSubcommand`](/fabr/api/types/subcommand/classes/basesubcommand/)\<[`InitArgs`](/fabr/api/commands/init/interfaces/initargs/)\>

## Constructors

### Constructor

> **new InitCommand**(): `InitCommand`

#### Returns

`InitCommand`

#### Inherited from

[`BaseSubcommand`](/fabr/api/types/subcommand/classes/basesubcommand/).[`constructor`](/fabr/api/types/subcommand/classes/basesubcommand/#constructor)

## Properties

### description

> `readonly` **description**: `"Create a new project from a template"` = `'Create a new project from a template'`

Defined in: [commands/init.ts:32](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/commands/init.ts#L32)

Command description - must be implemented by subclass.
A brief description of what the command does, used in help text.

#### Overrides

[`BaseSubcommand`](/fabr/api/types/subcommand/classes/basesubcommand/).[`description`](/fabr/api/types/subcommand/classes/basesubcommand/#description)

***

### name

> `readonly` **name**: `"init"` = `'init'`

Defined in: [commands/init.ts:31](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/commands/init.ts#L31)

Command name - must be implemented by subclass.
This should be the string used to invoke the command from the CLI.

#### Overrides

[`BaseSubcommand`](/fabr/api/types/subcommand/classes/basesubcommand/).[`name`](/fabr/api/types/subcommand/classes/basesubcommand/#name)

## Methods

### execute()

> **execute**(`templates`, `args`): `Promise`\<`void`\>

Defined in: [commands/init.ts:107](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/commands/init.ts#L107)

Execute the init command to create a new project from a template.

This method orchestrates the entire project creation process:
1. Validates the project name
2. Prompts for missing information (project name, template)
3. Downloads the template from GitHub
4. Processes the template configuration
5. Handles placeholders and environment variables
6. Runs setup commands
7. Installs dependencies and runs post-install tasks
8. Cleans up temporary files

#### Parameters

##### templates

[`Template`](/fabr/api/types/templates/interfaces/template/)[]

Array of available templates

##### args

[`InitArgs`](/fabr/api/commands/init/interfaces/initargs/)

Parsed command arguments

#### Returns

`Promise`\<`void`\>

A promise that resolves when project creation is complete

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

> **parseArgs**(`rawArgs`): [`InitArgs`](/fabr/api/commands/init/interfaces/initargs/)

Defined in: [commands/init.ts:73](https://github.com/yashjawale/fabr/blob/f92675816a3f8768b3ea0b7f8742e3a12556014c/src/commands/init.ts#L73)

Parse command line arguments for the init command.
Extracts project name, template slug, and help flag from the provided arguments.

#### Parameters

##### rawArgs

`string`[]

Raw command line arguments

#### Returns

[`InitArgs`](/fabr/api/commands/init/interfaces/initargs/)

Parsed init command arguments including project name and template slug

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
