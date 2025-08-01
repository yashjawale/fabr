# Fabr Configuration Schema

This document describes the JSON schema for `fabr.config.json` files used in Fabr templates.

## Overview

The `fabr.config.json` file allows template creators to define advanced setup behaviors including:

- Custom placeholder replacements with transformations
- Pre/post setup commands
- Dependency installation commands
- File filtering for placeholder replacement
- Git initialization
- File cleanup after setup

## Schema Reference

### Root Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `$schema` | string | No | Reference to the JSON schema file |
| `name` | string | No | Template configuration name |
| `description` | string | No | Brief description of the template |
| `version` | string | No | Version (semver format) |
| `preSetupCommand` | string | No | Command to run before setup |
| `postSetupCommand` | string | No | Command to run after placeholder replacement |
| `installCommand` | string | No | Command to install dependencies (default: "npm install") |
| `postInstallCommand` | string | No | Command to run after installation |
| `placeholders` | array | No | Array of placeholder configurations |
| `files` | object | No | File filtering configuration |
| `gitInit` | boolean | No | Whether to initialize git repository |
| `removeFiles` | array | No | Files to remove after setup |

### Placeholder Configuration

Each placeholder in the `placeholders` array can have:

#### Prompted Placeholders
For values that require user input:

```json
{
  "key": "PROJECT_NAME",
  "prompt": "What is your project name?",
  "description": "Additional help text",
  "default": "my-project",
  "required": true,
  "validate": {
    "pattern": "^[a-z][a-z0-9-]*$",
    "minLength": 3,
    "maxLength": 50
  }
}
```

#### Transformed Placeholders
For values derived from other placeholders:

```json
{
  "key": "PROJECT_NAME_PASCAL",
  "transform": {
    "source": "PROJECT_NAME",
    "case": "pascal"
  }
}
```

#### Default Case Placeholders
For prompted values with smart defaults:

```json
{
  "key": "COMPONENT_NAME",
  "prompt": "Main component name?",
  "defaultCase": {
    "source": "PROJECT_NAME",
    "case": "pascal",
    "template": "{value}App"
  }
}
```

### Case Transformations

Available case transformations:

- `kebab`: my-project-name
- `pascal`: MyProjectName
- `camel`: myProjectName
- `snake`: my_project_name
- `constant`: MY_PROJECT_NAME

### File Configuration

Control which files are processed for placeholder replacement:

```json
{
  "files": {
    "ignore": [
      "node_modules/**",
      "*.jpg",
      "*.png"
    ],
    "include": [
      "**/*.js",
      "**/*.ts",
      "**/*.json"
    ]
  }
}
```

### Validation Rules

For placeholder validation:

- `pattern`: Regular expression string
- `minLength`: Minimum character length
- `maxLength`: Maximum character length

## Complete Example

```json
{
  "$schema": "./fabr.config.schema.json",
  "name": "React TypeScript Starter",
  "description": "Modern React app with TypeScript and Vite",
  "version": "1.0.0",
  "preSetupCommand": "echo 'Setting up project...'",
  "installCommand": "npm install",
  "postInstallCommand": "npm run build",
  "gitInit": true,
  "placeholders": [
    {
      "key": "PROJECT_NAME",
      "prompt": "Project name?",
      "validate": {
        "pattern": "^[a-z][a-z0-9-]*$"
      }
    },
    {
      "key": "AUTHOR_NAME",
      "prompt": "Your name?",
      "default": "Anonymous"
    },
    {
      "key": "PROJECT_PASCAL",
      "transform": {
        "source": "PROJECT_NAME",
        "case": "pascal"
      }
    }
  ],
  "files": {
    "ignore": ["node_modules/**"],
    "include": ["**/*.ts", "**/*.js", "**/*.json"]
  },
  "removeFiles": ["fabr.config.json"]
}
```

## Usage in Templates

1. Place `fabr.config.json` in your template repository root
2. Use placeholder syntax in your template files: `{{PROJECT_NAME}}`
3. Run `npx fabr init` and select your template
4. Fabr will automatically process the configuration when the template is used

## Schema Validation

Include the schema reference for IDE support:

```json
{
  "$schema": "https://raw.githubusercontent.com/yashjawale/fabr/main/fabr.config.schema.json"
}
```

This enables autocomplete and validation in editors that support JSON Schema.
