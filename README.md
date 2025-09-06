# Fabr

A command line utility for scaffolding new development projects

## Quick Start

Create a new project from a template:

```bash
npx fabr init
```

List available templates:

```bash
npx fabr list
```

Get help:

```bash
npx fabr help
```

## Available Commands

- `npx fabr init` - Create a new project from a template
- `npx fabr list` - List all available templates
- `npx fabr help` - Show help information

## Features

### 🗂️ **File-Based Templates**

Traditional templates that copy files from a repository and replace placeholders:

- Copy template files to your project
- Replace placeholders like `{{PROJECT_NAME}}` in file contents
- Support for placeholder validation, transformations, and defaults

### ⚡ **Command-Based Templates**

Execute shell commands to set up projects programmatically:

- Run commands like `npm init`, `create-react-app`, etc.
- Use placeholders in commands: `npm pkg set name={{PROJECT_NAME}}`
- Perfect for CLI-based project setup workflows
- Control command output visibility and working directories

### 🔧 **Advanced Placeholder System**

- **Validation**: Regex patterns, min/max length
- **Transformations**: Convert between naming conventions (camelCase, kebab-case, etc.)
- **Defaults**: Computed defaults from other placeholders
- **Interactive prompts**: Guided project setup

### 🌍 **Environment Variable Management**

- **Automatic .env creation**: Generate .env and .env.local files from prompts
- **Sensitive data handling**: Separate local variables from shared config
- **Validation & defaults**: Same powerful validation as placeholders
- **Template integration**: Derive environment values from project placeholders

### 📝 **Template Configuration**

Templates use `fabr.config.json` to define:

- Placeholder prompts and validation
- Environment variable configuration
- Pre/post setup commands
- File processing rules
- Command sequences for setup

## Template Types

### File-Based Template

```json
{
	"name": "React App Template",
	"placeholders": [
		{
			"key": "PROJECT_NAME",
			"prompt": "Project name",
			"required": true
		}
	],
	"environmentVariables": [
		{
			"key": "API_URL",
			"prompt": "Enter API URL",
			"default": "http://localhost:3000/api"
		}
	]
}
```

### Command-Based Template

```json
{
	"type": "commands",
	"name": "Node.js Setup",
	"placeholders": [
		{
			"key": "PROJECT_NAME",
			"prompt": "Project name",
			"required": true
		}
	],
	"environmentVariables": [
		{
			"key": "PORT",
			"prompt": "Server port",
			"default": "3000"
		},
		{
			"key": "JWT_SECRET",
			"prompt": "JWT secret",
			"local": true,
			"required": true
		}
	],
	"commands": [
		{
			"command": "npm init -y",
			"description": "Initialize package.json"
		},
		{
			"command": "npm pkg set name={{PROJECT_NAME}}",
			"description": "Set project name"
		}
	]
}
```

## Documentation

- [Command-Based Templates Guide](./docs/COMMAND-TEMPLATES.md) - Detailed guide for command templates
- [Environment Variables Guide](./docs/ENVIRONMENT-VARIABLES.md) - Complete guide for .env file generation
- [Release Process](./docs/RELEASE.md) - Guide for maintainers on releasing new versions
- [JSON Schema](./fabr.config.schema.json) - Complete configuration schema
- [Examples](./examples/) - Sample configurations

## Contributing

### Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Test the CLI: `npm run test:cli`

### Release Process

For maintainers releasing new versions:

```bash
# Quick release using helper script
npm run release patch    # 1.0.0 -> 1.0.1
npm run release minor    # 1.0.0 -> 1.1.0
npm run release major    # 1.0.0 -> 2.0.0

# Or manually create a tag
git tag v1.0.0
git push origin v1.0.0
```

See [RELEASE.md](./docs/RELEASE.md) for detailed release instructions.
