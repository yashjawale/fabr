---
title: Configuration Reference
description: Complete reference for fabr.config.json template configuration
---

# Configuration Reference

This is a comprehensive reference for the `fabr.config.json` file that controls how templates work in fabr. Every template should have this file in its root directory.

## Basic Structure

A minimal `fabr.config.json` looks like this:

```json
{
  "name": "My Template",
  "description": "A simple project template"
}
```

For more advanced templates with placeholders and environment variables:

```json
{
  "$schema": "https://raw.githubusercontent.com/yashjawale/fabr/main/fabr.config.schema.json",
  "name": "Advanced Template",
  "description": "Template with placeholders and environment setup",
  "type": "files",
  "placeholders": [...],
  "environmentVariables": [...],
  "commands": [...]
}
```

## Root Properties

### Template Information

#### `name` (string, optional)
Display name for your template.

```json
{
  "name": "React TypeScript Starter"
}
```

#### `description` (string, optional)
Brief description shown in template lists.

```json
{
  "description": "Modern React app with TypeScript and Vite"
}
```

#### `version` (string, optional)
Template version following semantic versioning.

```json
{
  "version": "1.2.0"
}
```

### Template Type

#### `type` (string, optional)
Template type - omit for file-based, use `"commands"` for command-based.

```json
{
  "type": "commands"  // For command-based templates
}
```

### Schema Reference

#### `$schema` (string, optional)
JSON schema reference for IDE support and validation.

```json
{
  "$schema": "https://raw.githubusercontent.com/yashjawale/fabr/main/fabr.config.schema.json"
}
```

## Placeholders

The `placeholders` array defines variables that users provide during project creation.

### Basic Placeholder

```json
{
  "key": "PROJECT_NAME",
  "prompt": "What's your project name?",
  "required": true
}
```

### Placeholder Properties

#### `key` (string, required)
Variable name used in templates. Must be UPPERCASE with underscores.

#### `prompt` (string, optional)
Question shown to the user.

#### `description` (string, optional)
Additional help text displayed with the prompt.

#### `default` (string, optional)
Default value if user doesn't provide input.

#### `required` (boolean, optional, default: false)
Whether this placeholder is required.

#### `type` (string, optional, default: "string")
Input type. Supported values: `"string"`, `"boolean"`.

### Validation

Add validation rules to ensure user input meets requirements:

```json
{
  "key": "PROJECT_NAME",
  "prompt": "Project name",
  "required": true,
  "validation": {
    "pattern": "^[a-z0-9-]+$",
    "minLength": 3,
    "maxLength": 50,
    "message": "Use lowercase letters, numbers, and hyphens only"
  }
}
```

#### Validation Properties
- **`pattern`** - Regular expression string
- **`minLength`** - Minimum character length
- **`maxLength`** - Maximum character length
- **`message`** - Custom error message

### Transformations

Generate placeholders from other placeholders:

```json
{
  "key": "COMPONENT_NAME",
  "transform": {
    "source": "PROJECT_NAME",
    "case": "pascal"
  }
}
```

#### Available Cases
- **`lower`** - `my project name`
- **`upper`** - `MY PROJECT NAME`
- **`title`** - `My Project Name`
- **`camel`** - `myProjectName`
- **`pascal`** - `MyProjectName`
- **`kebab`** - `my-project-name`
- **`snake`** - `my_project_name`
- **`constant`** - `MY_PROJECT_NAME`

### Default Case

Provide smart defaults based on transformations:

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

## Environment Variables

The `environmentVariables` array configures automatic `.env` file generation.

### Basic Environment Variable

```json
{
  "key": "DATABASE_URL",
  "prompt": "Enter database URL",
  "required": true
}
```

### Environment Variable Properties

#### `key` (string, required)
Environment variable name. Must be UPPERCASE with underscores.

#### `prompt` (string, optional)
Question shown to the user.

#### `description` (string, optional)
Additional help text.

#### `default` (string, optional)
Default value. Can include placeholder references like `{{PROJECT_NAME}}`.

#### `required` (boolean, optional, default: false)
Whether this variable is required.

#### `local` (boolean, optional, default: false)
Save to `.env.local` instead of `.env` (for sensitive data).

#### `validate` (object, optional)
Validation rules (same format as placeholders).

#### `transform` (object, optional)
Generate value from a placeholder (same format as placeholders).

### Environment Variable Examples

```json
{
  "environmentVariables": [
    {
      "key": "DATABASE_URL",
      "prompt": "Database connection string",
      "required": true,
      "validate": {
        "pattern": "^postgresql://.+"
      }
    },
    {
      "key": "JWT_SECRET",
      "prompt": "JWT secret key",
      "local": true,
      "required": true
    },
    {
      "key": "APP_NAME",
      "transform": {
        "source": "PROJECT_NAME",
        "case": "title"
      }
    }
  ]
}
```

## Commands (Command-Based Templates)

For command-based templates, define shell commands to execute:

### Basic Command

```json
{
  "commands": [
    {
      "command": "npm init -y",
      "description": "Initialize package.json"
    }
  ]
}
```

### Command Properties

#### `command` (string, required)
Shell command to execute. Supports placeholder replacement.

#### `description` (string, optional)
Human-readable description shown during execution.

#### `workingDirectory` (string, optional)
Directory to run command in (relative to project root).

#### `showOutput` (boolean, optional, default: true)
Whether to show command output to user.

### Command Examples

```json
{
  "commands": [
    {
      "command": "npx create-react-app . --template typescript",
      "description": "Create React TypeScript app"
    },
    {
      "command": "npm pkg set name={{PROJECT_NAME}}",
      "description": "Update package name",
      "showOutput": false
    },
    {
      "command": "npm install",
      "description": "Install frontend dependencies",
      "workingDirectory": "./frontend"
    }
  ]
}
```

## File Processing (File-Based Templates)

### File Filtering

Control which files are processed for placeholder replacement:

```json
{
  "files": {
    "include": ["**/*.js", "**/*.ts", "**/*.json"],
    "exclude": ["node_modules/**", "*.jpg", "*.png", "dist/**"]
  }
}
```

### Ignore Patterns

Exclude files from processing:

```json
{
  "excludeFiles": [
    "node_modules/**",
    "*.log",
    ".DS_Store",
    "dist/**"
  ]
}
```

## Legacy Properties

These properties are supported for backward compatibility:

### Setup Commands

```json
{
  "preSetupCommand": "echo 'Starting setup...'",
  "postSetupCommand": "echo 'Setup complete!'",
  "installCommand": "npm install",
  "postInstallCommand": "npm run build"
}
```

### Git Initialization

```json
{
  "gitInit": true
}
```

### File Cleanup

```json
{
  "removeFiles": ["fabr.config.json", "temp/**"]
}
```

## Complete Examples

### File-Based Template

```json
{
  "$schema": "https://raw.githubusercontent.com/yashjawale/fabr/main/fabr.config.schema.json",
  "name": "React TypeScript Starter",
  "description": "Modern React app with TypeScript and testing",
  "version": "1.0.0",
  "placeholders": [
    {
      "key": "PROJECT_NAME",
      "prompt": "What's your project name?",
      "required": true,
      "validation": {
        "pattern": "^[a-z0-9-]+$",
        "message": "Use lowercase letters, numbers, and hyphens"
      }
    },
    {
      "key": "AUTHOR_NAME",
      "prompt": "Your name",
      "default": "Developer"
    },
    {
      "key": "COMPONENT_NAME",
      "transform": {
        "source": "PROJECT_NAME",
        "case": "pascal"
      }
    }
  ],
  "environmentVariables": [
    {
      "key": "VITE_APP_NAME",
      "transform": {
        "source": "PROJECT_NAME",
        "case": "title"
      }
    },
    {
      "key": "VITE_API_URL",
      "prompt": "API endpoint URL",
      "default": "http://localhost:3001/api"
    }
  ]
}
```

### Command-Based Template

```json
{
  "$schema": "https://raw.githubusercontent.com/yashjawale/fabr/main/fabr.config.schema.json",
  "type": "commands",
  "name": "Express API Starter",
  "description": "Node.js Express API with TypeScript and testing",
  "placeholders": [
    {
      "key": "PROJECT_NAME",
      "prompt": "API name",
      "required": true
    },
    {
      "key": "PORT",
      "prompt": "Server port",
      "default": "3000",
      "validation": {
        "pattern": "^[0-9]+$"
      }
    }
  ],
  "environmentVariables": [
    {
      "key": "PORT",
      "transform": {
        "source": "PORT"
      }
    },
    {
      "key": "JWT_SECRET",
      "prompt": "JWT secret key",
      "local": true,
      "required": true,
      "validation": {
        "minLength": 32
      }
    }
  ],
  "commands": [
    {
      "command": "npm init -y",
      "description": "Initialize package.json"
    },
    {
      "command": "npm pkg set name={{PROJECT_NAME}}",
      "description": "Set package name"
    },
    {
      "command": "npm install express cors helmet dotenv",
      "description": "Install dependencies"
    },
    {
      "command": "npm install -D @types/node @types/express typescript nodemon",
      "description": "Install dev dependencies"
    }
  ]
}
```

## Schema Validation

Include the `$schema` property to get autocomplete and validation in editors that support JSON Schema:

```json
{
  "$schema": "https://raw.githubusercontent.com/yashjawale/fabr/main/fabr.config.schema.json"
}
```

This enables intelligent editing features in VS Code, WebStorm, and other editors.

## Best Practices

1. **Always include schema reference** for better developer experience
2. **Use descriptive names and prompts** to help users understand what's needed
3. **Validate critical inputs** like project names and URLs
4. **Provide sensible defaults** to speed up project creation
5. **Use transformations** to reduce repetitive user input
6. **Mark sensitive variables as local** to keep them out of version control
7. **Add helpful descriptions** for complex configuration options

Ready to create your template configuration? Start with the basics and gradually add more advanced features as needed!
