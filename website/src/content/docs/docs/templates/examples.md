---
title: Template Examples
description: Complete examples of fabr.config.json configurations for different project types
---

This page provides complete, ready-to-use examples of `fabr.config.json` configurations for different types of templates. Use these as starting points for your own templates.

## Complete File-Based Template

A comprehensive example showing all available features for a file-based template:

```json
{
	"$schema": "./fabr.config.schema.json",
	"name": "Frontend TypeScript Starter",
	"description": "A modern frontend application with TypeScript and build tools",
	"version": "1.0.0",
	"preSetupCommand": "echo 'Setting up your TypeScript project...'",
	"installCommand": "npm install",
	"postInstallCommand": "npm run build",
	"gitInit": true,
	"placeholders": [
		{
			"key": "PROJECT_NAME",
			"prompt": "What is your project name?",
			"description": "This will be used as the package name (lowercase, kebab-case)",
			"validate": {
				"pattern": "^[a-z][a-z0-9-]*$",
				"minLength": 3,
				"maxLength": 50
			}
		},
		{
			"key": "PROJECT_TITLE",
			"prompt": "What is the display title for your project?",
			"description": "This will be shown in the app and README"
		},
		{
			"key": "AUTHOR_NAME",
			"prompt": "What is your name?",
			"description": "This will be used in package.json and license",
			"default": "Your Name"
		},
		{
			"key": "AUTHOR_EMAIL",
			"prompt": "What is your email?",
			"description": "This will be used in package.json",
			"validate": {
				"pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
			}
		},
		{
			"key": "PROJECT_NAME_PASCAL",
			"transform": {
				"source": "PROJECT_NAME",
				"case": "pascal"
			}
		},
		{
			"key": "PROJECT_NAME_CAMEL",
			"transform": {
				"source": "PROJECT_NAME",
				"case": "camel"
			}
		},
		{
			"key": "COMPONENT_NAME",
			"defaultCase": {
				"source": "PROJECT_NAME",
				"case": "pascal",
				"template": "{value}App"
			},
			"prompt": "What should the main component be called?"
		}
	],
	"files": {
		"ignore": [
			"node_modules/**",
			"dist/**",
			"build/**",
			"*.jpg",
			"*.jpeg",
			"*.png",
			"*.gif",
			"*.svg",
			"*.ico"
		],
		"include": [
			"**/*.js",
			"**/*.jsx",
			"**/*.ts",
			"**/*.tsx",
			"**/*.json",
			"**/*.md",
			"**/*.html",
			"**/*.css",
			"**/*.scss"
		]
	},
	"removeFiles": ["fabr.config.json", "README.template.md"]
}
```

## Command-Based Template

Example of a command-based template that uses shell commands:

```json
{
	"$schema": "./fabr.config.schema.json",
	"type": "commands",
	"name": "Backend API Starter",
	"description": "Create a backend API with package management and dependencies",
	"version": "1.0.0",
	"placeholders": [
		{
			"key": "PROJECT_NAME",
			"prompt": "Project name",
			"description": "Name for your API project",
			"validate": {
				"pattern": "^[a-z][a-z0-9-]*$",
				"minLength": 3
			}
		},
		{
			"key": "PORT",
			"prompt": "Server port",
			"description": "Port number for the API server",
			"default": "3000",
			"validate": {
				"pattern": "^[0-9]+$"
			}
		},
		{
			"key": "AUTHOR_NAME",
			"prompt": "Author name",
			"description": "Your name for package.json"
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
		},
		{
			"command": "npm pkg set description='{{PROJECT_NAME}} API server'",
			"description": "Set project description"
		},
		{
			"command": "npm pkg set author='{{AUTHOR_NAME}}'",
			"description": "Set author name"
		},
		{
			"command": "npm install express",
			"description": "Install web framework"
		},
		{
			"command": "npm install --save-dev nodemon",
			"description": "Install development tools"
		},
		{
			"command": "echo 'const express = require(\"express\"); const app = express(); const PORT = {{PORT}}; app.listen(PORT, () => console.log(`Server running on port ${PORT}`));' > index.js",
			"description": "Create main server file"
		},
		{
			"command": "npm pkg set scripts.start='node index.js'",
			"description": "Add start script"
		},
		{
			"command": "npm pkg set scripts.dev='nodemon index.js'",
			"description": "Add development script"
		}
	]
}
```

## Simple Command Template

A minimal command-based template for quick project setup:

```json
{
	"$schema": "./fabr.config.schema.json",
	"type": "commands",
	"name": "Simple Project Starter",
	"description": "Basic project setup with minimal configuration",
	"placeholders": [
		{
			"key": "PROJECT_NAME",
			"prompt": "Project name",
			"validate": {
				"pattern": "^[a-z][a-z0-9-]*$"
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
			"description": "Set project name"
		},
		{
			"command": "echo '# {{PROJECT_NAME}}' > README.md",
			"description": "Create README file"
		}
	]
}
```

## Environment Variables Template

Example showing environment variable configuration:

```json
{
	"$schema": "./fabr.config.schema.json",
	"name": "Environment Variables Example",
	"description": "Template demonstrating environment variable handling",
	"placeholders": [
		{
			"key": "PROJECT_NAME",
			"prompt": "Project name"
		},
		{
			"key": "DB_NAME",
			"prompt": "Database name",
			"default": "myapp_db"
		}
	],
	"environmentVariables": [
		{
			"key": "NODE_ENV",
			"value": "development",
			"description": "Application environment"
		},
		{
			"key": "PORT",
			"prompt": "Server port",
			"default": "3000",
			"description": "Port number for the server"
		},
		{
			"key": "DATABASE_URL",
			"prompt": "Database connection URL",
			"description": "Full database connection string",
			"local": true
		},
		{
			"key": "API_SECRET",
			"transform": {
				"source": "PROJECT_NAME",
				"case": "upper",
				"template": "{value}_SECRET_KEY"
			},
			"local": true,
			"description": "API secret key (auto-generated)"
		},
		{
			"key": "DB_NAME",
			"value": "{{DB_NAME}}",
			"description": "Database name from placeholder"
		}
	]
}
```

## Simple Environment Template

Minimal environment variable setup:

```json
{
	"$schema": "./fabr.config.schema.json",
	"name": "Simple Environment Setup",
	"description": "Basic environment configuration",
	"environmentVariables": [
		{
			"key": "NODE_ENV",
			"value": "development"
		},
		{
			"key": "PORT",
			"prompt": "Server port",
			"default": "3000"
		}
	]
}
```

## Usage Tips

### Getting Started

1. Copy one of the examples above that matches your project type
2. Save it as `fabr.config.json` in your template repository
3. Customize the configuration for your specific needs
4. Test the template with `fabr init test-project --template=your-repo`

### Best Practices

- Use descriptive names and descriptions for all placeholders
- Add validation patterns to ensure user input is correct
- Include helpful default values where appropriate
- Group related environment variables together
- Test templates thoroughly before sharing

### File Organization

For file-based templates, organize your template files like this:

```
my-template/
├── fabr.config.json
├── README.md
├── package.json.template
├── src/
│   ├── index.{{FILE_EXTENSION}}
│   └── components/
│       └── {{COMPONENT_NAME}}.{{FILE_EXTENSION}}
└── docs/
    └── setup.md
```

### Advanced Features

- Use transforms to automatically generate variations of user input
- Combine file-based and command-based approaches when needed
- Leverage environment variables for configuration that varies by environment
- Use conditional commands to handle optional features

## Next Steps

- Learn more about [Configuration Reference](/docs/templates/configuration)
- Understand [Environment Variables](/docs/templates/environment-variables)
- Explore [File-Based Templates](/docs/templates/file-based)
- Discover [Command-Based Templates](/docs/templates/command-based)
