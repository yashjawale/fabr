---
title: Templates Overview
description: Learn about the different types of templates in fabr and how to create your own
---

# Templates Overview

Templates are the heart of fabr. They define how new projects should be set up, what files to include, and what questions to ask users during project creation.

## Types of Templates

Fabr supports two types of templates, each with their own strengths:

### File-Based Templates
These templates work by copying files from a repository and replacing placeholders in the content.

**Best for:**
- Static project structures
- Boilerplate code that doesn't change much
- Templates with many files
- When you want to version control your template files

**Example use cases:**
- React component libraries
- Documentation sites
- Configuration files
- Static websites

### Command-Based Templates  
These templates run shell commands to set up projects programmatically.

**Best for:**
- CLI-based project creation (like `create-react-app`)
- Dynamic project setup
- Integration with existing tools
- Complex initialization workflows

**Example use cases:**
- Next.js apps (using `create-next-app`)
- Node.js servers (using `npm init`)
- Database setup with migrations
- Docker container initialization

## Template Configuration

Every template uses a `fabr.config.json` file to define:

- **Project information** - Name, description, type
- **Placeholders** - Variables that users provide during setup
- **Environment variables** - .env file generation
- **Commands** - For command-based templates
- **File processing** - How files should be handled

## Placeholder System

Both template types use fabr's powerful placeholder system:

```json
{
  "placeholders": [
    {
      "key": "PROJECT_NAME",
      "prompt": "What's your project name?",
      "required": true,
      "validation": {
        "pattern": "^[a-z0-9-]+$",
        "message": "Project name must be lowercase with hyphens"
      }
    }
  ]
}
```

Placeholders can be used in:
- File contents (for file-based templates)
- Commands (for command-based templates)  
- Environment variable values
- File and folder names

## Environment Variables

Fabr can automatically generate `.env` files for your projects:

```json
{
  "environmentVariables": [
    {
      "key": "API_URL",
      "prompt": "Enter your API URL",
      "default": "http://localhost:3000/api"
    },
    {
      "key": "JWT_SECRET", 
      "prompt": "Enter JWT secret",
      "local": true,
      "required": true
    }
  ]
}
```

Variables marked as `local: true` go into `.env.local` (for sensitive data), while others go into `.env`.

## Getting Started with Templates

Ready to dive deeper? Here's what to explore next:

1. **[File-Based Templates](/templates/file-based)** - Learn to create templates with files and folders
2. **[Command-Based Templates](/templates/command-based)** - Set up projects with shell commands  
3. **[Environment Variables](/templates/environment-variables)** - Generate .env files automatically
4. **[Configuration Reference](/templates/configuration)** - Complete fabr.config.json documentation

## Template Examples

Check out these example templates to see how everything works together:

- **Simple React App** - File-based template with TypeScript setup
- **Node.js API** - Command-based template using npm init
- **Full-Stack App** - Combined approach with database setup
- **Static Site** - Minimal file-based template for HTML/CSS/JS

Browse the [examples directory](https://github.com/yashjawale/fabr/tree/main/examples) in the fabr repository for complete template configurations.
