# Templates Configuration Schema

This document describes the JSON schema for `templates.json` files used to define available project templates in Fabr.

## Overview

The `templates.json` file defines the collection of project templates that users can choose from when creating new projects. It uses a simplified schema focused on the essential template information.

## Schema Reference

### Root Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `$schema` | string | No | Reference to the JSON schema file |
| `templates` | array | **Yes** | Array of available project templates |
| `defaultTemplate` | string | No | Default template slug to select |

### Template Properties

Each template in the `templates` array requires only these essential properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | **Yes** | Display name shown to users |
| `slug` | string | **Yes** | Unique identifier (kebab-case) |
| `repo` | string | **Yes** | GitHub repo (`owner/repo`) or full URL |

## Example

```json
{
  "$schema": "./templates.schema.json",
  "templates": [
    {
      "name": "React TypeScript App",
      "slug": "react-typescript",
      "repo": "facebook/create-react-app"
    },
    {
      "name": "Express REST API", 
      "slug": "express-api",
      "repo": "expressjs/express-starter"
    }
  ],
  "defaultTemplate": "react-typescript"
}
```

## Validation Rules

### Slug Pattern
- Must contain only lowercase letters, numbers, and hyphens
- Cannot start or end with a hyphen
- Pattern: `^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$`

### Repository Format
- GitHub repository: `owner/repo` format
- Full URL: Any valid HTTP/HTTPS URL
- Pattern: `^([a-zA-Z0-9_.-]+/[a-zA-Z0-9_.-]+)|(https?://[^\\s]+)$`

### Default Template
- Must match the `slug` of one of the templates in the array
- Used to pre-select a template in the CLI interface

## Usage

Place your `templates.json` file in the `src/` directory of your Fabr project. The CLI will automatically load and validate this configuration when presenting template choices to users.
