---
description: Auto-generated API documentation
title: "Interface: FabrConfig"
---

[**fabr**](../../../README.md)

***

[fabr](../../../README.md) / [types/fabr-config](../README.md) / FabrConfig

# Interface: FabrConfig

Defined in: [types/fabr-config.ts:91](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L91)

## Properties

### name?

> `optional` **name**: `string`

Defined in: [types/fabr-config.ts:93](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L93)

The name of the template configuration

***

### description?

> `optional` **description**: `string`

Defined in: [types/fabr-config.ts:95](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L95)

A brief description of what this template creates

***

### version?

> `optional` **version**: `string`

Defined in: [types/fabr-config.ts:97](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L97)

Version of the template configuration

***

### type?

> `optional` **type**: `"files"` \| `"commands"`

Defined in: [types/fabr-config.ts:99](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L99)

Template type: 'files' (default) or 'commands'

***

### preSetupCommand?

> `optional` **preSetupCommand**: `string`

Defined in: [types/fabr-config.ts:101](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L101)

Command to run before any setup tasks

***

### postSetupCommand?

> `optional` **postSetupCommand**: `string`

Defined in: [types/fabr-config.ts:103](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L103)

Command to run after placeholder replacement

***

### installCommand?

> `optional` **installCommand**: `string`

Defined in: [types/fabr-config.ts:105](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L105)

Command to install dependencies

***

### postInstallCommand?

> `optional` **postInstallCommand**: `string`

Defined in: [types/fabr-config.ts:107](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L107)

Command to run after dependency installation

***

### placeholders?

> `optional` **placeholders**: [`Placeholder`](Placeholder.md)[]

Defined in: [types/fabr-config.ts:109](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L109)

Array of placeholder configurations for template customization

***

### environmentVariables?

> `optional` **environmentVariables**: [`EnvironmentVariable`](EnvironmentVariable.md)[]

Defined in: [types/fabr-config.ts:111](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L111)

Array of environment variable configurations

***

### files?

> `optional` **files**: [`FileConfiguration`](FileConfiguration.md)

Defined in: [types/fabr-config.ts:113](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L113)

File-specific configurations

***

### gitInit?

> `optional` **gitInit**: `boolean`

Defined in: [types/fabr-config.ts:115](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L115)

Whether to initialize a git repository after setup

***

### removeFiles?

> `optional` **removeFiles**: `string`[]

Defined in: [types/fabr-config.ts:117](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L117)

Array of file patterns to remove after setup completion

***

### commands?

> `optional` **commands**: [`CommandTemplate`](CommandTemplate.md)[]

Defined in: [types/fabr-config.ts:119](https://github.com/yashjawale/fabr/blob/main/src/types/fabr-config.ts#L119)

Array of commands to run for command-based templates
