---
title: File-Based Templates
description: Create templates using files and folders that get copied and customized for new projects
---

File-based templates work by copying files from a repository and replacing placeholders in the content. This is the traditional approach to project templates and works great for most use cases.

## How File-Based Templates Work

1. **Template Repository** - Your template lives in a Git repository with your project files
2. **Download** - Fabr clones the repository to get your template files
3. **Placeholder Replacement** - Any `{{PLACEHOLDER}}` patterns in files get replaced
4. **Copy to Project** - The processed files are copied to the new project directory

## Creating a File-Based Template

### 1. Set Up Your Template Repository

Create a new Git repository with your template files:

```
my-template/
├── fabr.config.json          # Template configuration
├── package.json              # Package with {{PROJECT_NAME}}
├── README.md                 # Documentation with placeholders
├── src/
│   ├── index.js             # Main application file
│   └── components/
│       └── App.js           # Component files
└── .env.example             # Environment variables template
```

### 2. Configure Your Template

Create a `fabr.config.json` file in your repository root:

```json
{
	"name": "React App Template",
	"description": "A simple React application with modern tooling",
	"placeholders": [
		{
			"key": "PROJECT_NAME",
			"prompt": "What's your project name?",
			"required": true,
			"validation": {
				"pattern": "^[a-z0-9-]+$",
				"message": "Use lowercase letters, numbers, and hyphens only"
			}
		},
		{
			"key": "PROJECT_DESCRIPTION",
			"prompt": "Project description",
			"default": "A new React application"
		},
		{
			"key": "AUTHOR_NAME",
			"prompt": "Your name",
			"required": true
		}
	]
}
```

### 3. Use Placeholders in Files

Add placeholders anywhere in your template files:

**package.json:**

```json
{
	"name": "{{PROJECT_NAME}}",
	"description": "{{PROJECT_DESCRIPTION}}",
	"author": "{{AUTHOR_NAME}}",
	"version": "1.0.0"
}
```

**README.md:**

```markdown
# {{PROJECT_NAME}}

{{PROJECT_DESCRIPTION}}

## Getting Started

Welcome to {{PROJECT_NAME}}! This project was created by {{AUTHOR_NAME}}.
```

**src/index.js:**

```javascript
console.log('Welcome to {{PROJECT_NAME}}!')

const config = {
	appName: '{{PROJECT_NAME}}',
	description: '{{PROJECT_DESCRIPTION}}',
}
```

## Placeholder Features

### Basic Placeholders

Simple text replacement:

```json
{
	"key": "PROJECT_NAME",
	"prompt": "Project name",
	"required": true
}
```

### Validation

Ensure user input matches requirements:

```json
{
	"key": "PROJECT_NAME",
	"prompt": "Project name (lowercase, no spaces)",
	"required": true,
	"validation": {
		"pattern": "^[a-z0-9-]+$",
		"message": "Use lowercase letters, numbers, and hyphens only"
	}
}
```

### Defaults

Provide fallback values:

```json
{
	"key": "PORT",
	"prompt": "Server port",
	"default": "3000"
}
```

### Transformations

Automatically generate values from other placeholders:

```json
{
	"key": "PROJECT_TITLE",
	"transform": {
		"source": "PROJECT_NAME",
		"case": "title"
	}
}
```

Available transformations:

- `lower` - lowercase
- `upper` - UPPERCASE
- `title` - Title Case
- `camel` - camelCase
- `pascal` - PascalCase
- `kebab` - kebab-case
- `snake` - snake_case

### Computed Defaults

Generate defaults based on other placeholders:

```json
{
	"key": "REPO_URL",
	"prompt": "Repository URL",
	"default": "https://github.com/{{AUTHOR_NAME}}/{{PROJECT_NAME}}"
}
```

## File Processing

### Included Files

By default, all files except these are processed:

- `.git/` directory
- `node_modules/` directory
- Binary files (images, videos, etc.)
- Files larger than 10MB

### Excluded Files

You can exclude files from processing:

```json
{
	"excludeFiles": ["*.log", "temp/*", ".DS_Store"]
}
```

### Binary Files

Binary files are copied without placeholder replacement. Fabr automatically detects common binary file types.

## Advanced Features

### Environment Variables

Generate `.env` files automatically:

```json
{
	"environmentVariables": [
		{
			"key": "API_URL",
			"prompt": "API endpoint URL",
			"default": "http://localhost:3000/api"
		},
		{
			"key": "JWT_SECRET",
			"prompt": "JWT secret key",
			"local": true,
			"required": true
		}
	]
}
```

### Post-Processing Commands

Run commands after file processing:

```json
{
	"postCommands": [
		{
			"command": "npm install",
			"description": "Install dependencies"
		}
	]
}
```

## Example Template Structure

Here's a complete example of a Node.js API template:

```
node-api-template/
├── fabr.config.json
├── package.json
├── README.md
├── .env.example
├── .gitignore
├── src/
│   ├── index.js
│   ├── routes/
│   │   └── api.js
│   └── middleware/
│       └── auth.js
├── tests/
│   └── api.test.js
└── docs/
    └── API.md
```

**fabr.config.json:**

```json
{
	"name": "Node.js API Template",
	"description": "Express.js API with authentication and testing",
	"placeholders": [
		{
			"key": "PROJECT_NAME",
			"prompt": "API name",
			"required": true,
			"validation": {
				"pattern": "^[a-z0-9-]+$"
			}
		},
		{
			"key": "PROJECT_DESCRIPTION",
			"prompt": "API description",
			"default": "A new Express.js API"
		},
		{
			"key": "AUTHOR_NAME",
			"prompt": "Your name",
			"required": true
		},
		{
			"key": "API_VERSION",
			"prompt": "API version",
			"default": "v1"
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
			"prompt": "JWT secret (keep this secure!)",
			"local": true,
			"required": true
		}
	]
}
```

## Publishing Your Template

Once your template is ready:

1. **Push to Git** - Make sure your repository is publicly accessible
2. **Test locally** - Use `npx fabr init test-project --template=your-repo-url`
3. **Share** - Give others your repository URL to use your template

## Best Practices

### 1. Use Clear Placeholder Names

```json
{
	"key": "PROJECT_NAME", // ✅ Clear and descriptive
	"key": "NAME" // ❌ Too generic
}
```

### 2. Provide Good Defaults

```json
{
	"key": "PORT",
	"prompt": "Server port",
	"default": "3000" // ✅ Sensible default
}
```

### 3. Validate User Input

```json
{
	"validation": {
		"pattern": "^[a-z0-9-]+$",
		"message": "Use lowercase letters, numbers, and hyphens only"
	}
}
```

### 4. Document Your Template

Include a clear README.md explaining:

- What the template creates
- Required dependencies
- How to get started
- Configuration options

### 5. Use Transformations Wisely

```json
{
	"key": "COMPONENT_NAME",
	"transform": {
		"source": "PROJECT_NAME",
		"case": "pascal" // Automatically generate PascalCase
	}
}
```

Now you're ready to create powerful file-based templates! Check out the [configuration reference](/templates/configuration) for all available options.
