---
title: Command-Based Templates
description: Set up projects using shell commands instead of copying files
---

Command-based templates create projects by executing shell commands rather than copying files. This approach is perfect when you want to use existing CLI tools or package managers for project setup.

## When to Use Command-Based Templates

Command-based templates are ideal for:

- **CLI tool integration** - Using project creation tools and package managers
- **Dynamic setup** - Projects that require complex initialization
- **Tool-specific workflows** - Leveraging existing ecosystem tools
- **Package management** - Installing and configuring dependencies
- **Package manager setup** - Running `npm init`, `yarn create`, etc.
- **Database initialization** - Setting up migrations, seeding data
- **Dynamic project generation** - Creating files programmatically
- **Complex setup workflows** - Multi-step initialization processes

## Creating a Command-Based Template

### 1. Basic Configuration

Create a `fabr.config.json` with `"type": "commands"`:

```json
{
	"type": "commands",
	"name": "Basic API Starter",
	"description": "Creates a basic API project using package managers",
	"placeholders": [
		{
			"key": "PROJECT_NAME",
			"prompt": "Project name",
			"required": true,
			"validation": {
				"pattern": "^[a-z0-9-]+$"
			}
		},
		{
			"key": "PORT",
			"prompt": "Server port",
			"default": "3000"
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
			"command": "npm install express",
			"description": "Install web framework"
		}
	]
}
```

### 2. Command Properties

Each command in the `commands` array supports these properties:

#### `command` (required)

The shell command to execute. Supports placeholder replacement:

```json
{
	"command": "echo 'Port: {{PORT}}' > config.txt"
}
```

#### `description` (optional)

Human-readable description shown during execution:

```json
{
	"command": "npm install web-framework security-middleware cors",
	"description": "Install web framework and security middleware"
}
```

#### `workingDirectory` (optional)

Run the command in a specific directory (relative to project root):

```json
{
	"command": "npm init -y",
	"description": "Initialize frontend package.json",
	"workingDirectory": "./frontend"
}
```

#### `showOutput` (optional, default: true)

Control whether command output is shown to the user:

```json
{
	"command": "npm install --silent",
	"description": "Install dependencies quietly",
	"showOutput": false
}
```

## Using Placeholders in Commands

All placeholder features work in commands:

### Basic Replacement

```json
{
	"placeholders": [
		{
			"key": "PROJECT_NAME",
			"prompt": "Project name"
		}
	],
	"commands": [
		{
			"command": "mkdir {{PROJECT_NAME}}-api",
			"description": "Create API directory"
		}
	]
}
```

### Transformations

```json
{
	"placeholders": [
		{
			"key": "COMPONENT_NAME",
			"transform": {
				"source": "PROJECT_NAME",
				"case": "pascal"
			}
		}
	],
	"commands": [
		{
			"command": "echo 'export default class {{COMPONENT_NAME}} {}' > src/{{COMPONENT_NAME}}.js",
			"description": "Create main component"
		}
	]
}
```

### Environment Variables

Generate and use environment variables in commands:

```json
{
	"environmentVariables": [
		{
			"key": "DATABASE_URL",
			"prompt": "Database connection string",
			"default": "sqlite:///app.db"
		}
	],
	"commands": [
		{
			"command": "echo 'DATABASE_URL={{DATABASE_URL}}' > .env",
			"description": "Create environment file"
		}
	]
}
```

## Execution Flow

When a user runs a command-based template:

1. **Repository Download** - Template repository is cloned (can be empty except for config)
2. **Placeholder Collection** - User is prompted for all placeholder values
3. **Environment Setup** - .env files are generated if configured
4. **Command Execution** - Commands run sequentially with real-time output
5. **Cleanup** - Temporary files are removed

### Example Execution Output

```bash
🔧 Processing command-based template...

📋 Executing template commands...

[1/4] Initialize package.json
   $ npm init -y
   ✓ Completed

[2/4] Set project name
   $ npm pkg set name=my-awesome-api
   ✓ Completed

[3/4] Install web framework
   $ npm install express
   added 1 package, and audited 2 packages in 1s
   ✓ Completed

[4/4] Create main server file
   $ echo 'const framework = require("web-framework"); ...' > index.js
   ✓ Completed

✅ Template setup complete!
```

## Complex Examples

### Frontend App with TypeScript

```json
{
	"type": "commands",
	"name": "Frontend TypeScript App",
	"description": "Create frontend app with TypeScript and additional tools",
	"placeholders": [
		{
			"key": "PROJECT_NAME",
			"prompt": "App name",
			"required": true
		},
		{
			"key": "USE_TAILWIND",
			"prompt": "Use Tailwind CSS?",
			"type": "boolean",
			"default": true
		}
	],
	"commands": [
		{
			"command": "npx create-frontend-app . --template typescript",
			"description": "Create frontend app with TypeScript"
		},
		{
			"command": "npm pkg set name={{PROJECT_NAME}}",
			"description": "Update package name"
		},
		{
			"command": "npm install --save-dev tailwindcss postcss autoprefixer",
			"description": "Install CSS framework",
			"condition": "{{USE_TAILWIND}}"
		},
		{
			"command": "npx css-framework init -p",
			"description": "Initialize CSS config",
			"condition": "{{USE_TAILWIND}}"
		}
	]
}
```

### Full-Stack Application

```json
{
	"type": "commands",
	"name": "Full-Stack Web App",
	"description": "Full-stack web application with database setup",
	"placeholders": [
		{
			"key": "PROJECT_NAME",
			"prompt": "Project name",
			"required": true
		},
		{
			"key": "DB_NAME",
			"prompt": "Database name",
			"default": "{{PROJECT_NAME}}_db"
		}
	],
	"environmentVariables": [
		{
			"key": "DATABASE_URL",
			"prompt": "Database connection string",
			"default": "postgresql://localhost:5432/{{DB_NAME}}"
		},
		{
			"key": "JWT_SECRET",
			"prompt": "JWT secret key",
			"local": true,
			"required": true
		}
	],
	"commands": [
		{
			"command": "mkdir -p backend frontend database",
			"description": "Create project structure"
		},
		{
			"command": "npm init -y",
			"description": "Initialize backend package.json",
			"workingDirectory": "./backend"
		},
		{
			"command": "npm install express pg jsonwebtoken bcryptjs",
			"description": "Install backend dependencies",
			"workingDirectory": "./backend"
		},
		{
			"command": "npx create-react-app . --template typescript",
			"description": "Create React frontend",
			"workingDirectory": "./frontend"
		},
		{
			"command": "createdb {{DB_NAME}}",
			"description": "Create PostgreSQL database"
		}
	]
}
```

## Best Practices

### 1. Use Descriptive Descriptions

```json
{
	"command": "npm install",
	"description": "Install project dependencies" // ✅ Clear purpose
}
```

### 2. Control Output Appropriately

```json
{
  "command": "npm install",
  "description": "Install dependencies",
  "showOutput": true                           // Show progress
},
{
  "command": "npm pkg set private=true",
  "description": "Mark package as private",
  "showOutput": false                          // Hide noise
}
```

### 3. Use Working Directories for Organization

```json
{
  "command": "npm init -y",
  "description": "Initialize backend",
  "workingDirectory": "./backend"
},
{
  "command": "npm init -y",
  "description": "Initialize frontend",
  "workingDirectory": "./frontend"
}
```

### 4. Validate Command Prerequisites

```json
{
	"placeholders": [
		{
			"key": "DB_NAME",
			"prompt": "Database name",
			"validation": {
				"pattern": "^[a-zA-Z][a-zA-Z0-9_]*$",
				"message": "Database name must start with a letter"
			}
		}
	]
}
```

### 5. Handle Errors Gracefully

Commands that fail will stop execution. Ensure your commands:

- Use appropriate flags (like `--yes` for auto-confirmation)
- Have reasonable defaults
- Don't require interactive input

## Combining with File-Based Templates

You can combine both approaches by omitting the `type` field. This processes files first, then runs commands:

```json
{
  "name": "Hybrid Template",
  "description": "Copies files then runs setup commands",
  "placeholders": [...],
  "commands": [
    {
      "command": "npm install",
      "description": "Install dependencies from package.json"
    }
  ]
}
```

## Template Repository

Command-based templates still need a Git repository, but it can be minimal:

```
my-command-template/
└── fabr.config.json          # Only this file is required!
```

The repository serves as the source for the configuration file. All project setup happens through commands.

Ready to create your first command-based template? Check out the [configuration reference](/templates/configuration) for all available options!
