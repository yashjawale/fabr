---
editUrl: false
next: false
prev: false
title: "BaseSubcommand"
---

Defined in: [types/subcommand.ts:25](https://github.com/yashjawale/fabr/blob/af253d796213941a067e07d1a9e8b7372a1ddc07/src/types/subcommand.ts#L25)

Base class for implementing subcommands with consistent structure.
Provides a common framework for command parsing, help display, and execution.
Implements the SubcommandDefinition interface with standardized behavior.

## Extended by

- [`HelpCommand`](/fabr/docs/api/commands/help/classes/helpcommand/)
- [`InitCommand`](/fabr/docs/api/commands/init/classes/initcommand/)
- [`ListCommand`](/fabr/docs/api/commands/list/classes/listcommand/)

## Type Parameters

### T

`T` *extends* [`SubcommandArgs`](/fabr/docs/api/types/subcommand/interfaces/subcommandargs/) = [`SubcommandArgs`](/fabr/docs/api/types/subcommand/interfaces/subcommandargs/)

## Implements

- [`SubcommandDefinition`](/fabr/docs/api/types/subcommand/interfaces/subcommanddefinition/)\<`T`\>

## Constructors

### Constructor

> **new BaseSubcommand**\<`T`\>(): `BaseSubcommand`\<`T`\>

#### Returns

`BaseSubcommand`\<`T`\>

## Methods

### execute()

> `abstract` **execute**(`templates`, `args`): `Promise`\<`void`\>

Defined in: [types/subcommand.ts:69](https://github.com/yashjawale/fabr/blob/af253d796213941a067e07d1a9e8b7372a1ddc07/src/types/subcommand.ts#L69)

Execute the command with parsed arguments.
Must be implemented by subclass to provide the command's functionality.

#### Parameters

##### templates

[`Template`](/fabr/docs/api/types/templates/interfaces/template/)[]

Available templates array

##### args

`T`

Parsed command arguments

#### Returns

`Promise`\<`void`\>

Promise that resolves when command execution is complete

#### Implementation of

[`SubcommandDefinition`](/fabr/docs/api/types/subcommand/interfaces/subcommanddefinition/).[`execute`](/fabr/docs/api/types/subcommand/interfaces/subcommanddefinition/#execute)

***

### handle()

> **handle**(`templates`, `rawArgs`): `Promise`\<`void`\>

Defined in: [types/subcommand.ts:94](https://github.com/yashjawale/fabr/blob/af253d796213941a067e07d1a9e8b7372a1ddc07/src/types/subcommand.ts#L94)

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

***

### parseArgs()

> `abstract` **parseArgs**(`args`): `T`

Defined in: [types/subcommand.ts:58](https://github.com/yashjawale/fabr/blob/af253d796213941a067e07d1a9e8b7372a1ddc07/src/types/subcommand.ts#L58)

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

[`SubcommandDefinition`](/fabr/docs/api/types/subcommand/interfaces/subcommanddefinition/).[`parseArgs`](/fabr/docs/api/types/subcommand/interfaces/subcommanddefinition/#parseargs)

***

### showHelp()

> **showHelp**(): `void`

Defined in: [types/subcommand.ts:77](https://github.com/yashjawale/fabr/blob/af253d796213941a067e07d1a9e8b7372a1ddc07/src/types/subcommand.ts#L77)

Show help for this command using the help content configuration.
Uses the getHelpContent() method to format and display help information.

#### Returns

`void`

#### Implementation of

[`SubcommandDefinition`](/fabr/docs/api/types/subcommand/interfaces/subcommanddefinition/).[`showHelp`](/fabr/docs/api/types/subcommand/interfaces/subcommanddefinition/#showhelp)

## Properties

### description

> `abstract` `readonly` **description**: `string`

Defined in: [types/subcommand.ts:38](https://github.com/yashjawale/fabr/blob/af253d796213941a067e07d1a9e8b7372a1ddc07/src/types/subcommand.ts#L38)

Command description - must be implemented by subclass.
A brief description of what the command does, used in help text.

#### Implementation of

[`SubcommandDefinition`](/fabr/docs/api/types/subcommand/interfaces/subcommanddefinition/).[`description`](/fabr/docs/api/types/subcommand/interfaces/subcommanddefinition/#description)

***

### name

> `abstract` `readonly` **name**: `string`

Defined in: [types/subcommand.ts:32](https://github.com/yashjawale/fabr/blob/af253d796213941a067e07d1a9e8b7372a1ddc07/src/types/subcommand.ts#L32)

Command name - must be implemented by subclass.
This should be the string used to invoke the command from the CLI.

#### Implementation of

[`SubcommandDefinition`](/fabr/docs/api/types/subcommand/interfaces/subcommanddefinition/).[`name`](/fabr/docs/api/types/subcommand/interfaces/subcommanddefinition/#name)
