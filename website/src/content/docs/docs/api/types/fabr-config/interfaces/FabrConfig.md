---
editUrl: false
next: false
prev: false
title: "FabrConfig"
---

Defined in: [types/fabr-config.ts:91](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/fabr-config.ts#L91)

## Properties

### commands?

> `optional` **commands**: [`CommandTemplate`](/fabr/docs/api/types/fabr-config/interfaces/commandtemplate/)[]

Defined in: [types/fabr-config.ts:119](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/fabr-config.ts#L119)

Array of commands to run for command-based templates

***

### description?

> `optional` **description**: `string`

Defined in: [types/fabr-config.ts:95](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/fabr-config.ts#L95)

A brief description of what this template creates

***

### environmentVariables?

> `optional` **environmentVariables**: [`EnvironmentVariable`](/fabr/docs/api/types/fabr-config/interfaces/environmentvariable/)[]

Defined in: [types/fabr-config.ts:111](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/fabr-config.ts#L111)

Array of environment variable configurations

***

### files?

> `optional` **files**: [`FileConfiguration`](/fabr/docs/api/types/fabr-config/interfaces/fileconfiguration/)

Defined in: [types/fabr-config.ts:113](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/fabr-config.ts#L113)

File-specific configurations

***

### gitInit?

> `optional` **gitInit**: `boolean`

Defined in: [types/fabr-config.ts:115](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/fabr-config.ts#L115)

Whether to initialize a git repository after setup

***

### installCommand?

> `optional` **installCommand**: `string`

Defined in: [types/fabr-config.ts:105](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/fabr-config.ts#L105)

Command to install dependencies

***

### name?

> `optional` **name**: `string`

Defined in: [types/fabr-config.ts:93](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/fabr-config.ts#L93)

The name of the template configuration

***

### placeholders?

> `optional` **placeholders**: [`Placeholder`](/fabr/docs/api/types/fabr-config/interfaces/placeholder/)[]

Defined in: [types/fabr-config.ts:109](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/fabr-config.ts#L109)

Array of placeholder configurations for template customization

***

### postInstallCommand?

> `optional` **postInstallCommand**: `string`

Defined in: [types/fabr-config.ts:107](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/fabr-config.ts#L107)

Command to run after dependency installation

***

### postSetupCommand?

> `optional` **postSetupCommand**: `string`

Defined in: [types/fabr-config.ts:103](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/fabr-config.ts#L103)

Command to run after placeholder replacement

***

### preSetupCommand?

> `optional` **preSetupCommand**: `string`

Defined in: [types/fabr-config.ts:101](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/fabr-config.ts#L101)

Command to run before any setup tasks

***

### removeFiles?

> `optional` **removeFiles**: `string`[]

Defined in: [types/fabr-config.ts:117](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/fabr-config.ts#L117)

Array of file patterns to remove after setup completion

***

### type?

> `optional` **type**: `"files"` \| `"commands"`

Defined in: [types/fabr-config.ts:99](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/fabr-config.ts#L99)

Template type: 'files' (default) or 'commands'

***

### version?

> `optional` **version**: `string`

Defined in: [types/fabr-config.ts:97](https://github.com/yashjawale/fabr/blob/2175f836f52904c60bea5117c14ee0416e76bd93/src/types/fabr-config.ts#L97)

Version of the template configuration
