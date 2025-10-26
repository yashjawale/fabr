---
title: Get to Know the CLI
description: Complete reference of fabr CLI commands with usage examples and options
---

Fabr provides a simple yet powerful command-line interface with five main commands. Each command is designed to be intuitive and follows consistent patterns for options and arguments.

## Command Overview

| Command   | Purpose                              | Example                    |
| --------- | ------------------------------------ | -------------------------- |
| `init`    | Create a new project from a template | `npx fabr init my-project` |
| `list`    | List all available templates         | `npx fabr list`            |
| `search`  | Search templates by keywords         | `npx fabr search react`    |
| `help`    | Show help information                | `npx fabr help`            |
| `version` | Show version information             | `npx fabr version`         |

## Global Options

These options work with any command:

- `--help, -h` - Show help for the command
- `--version, -v` - Show version information (works globally)

## Command Details

### `init` - Create New Project

The main command for creating projects from templates.

**Usage:**

```bash
npx fabr init [project-name] [options]
```

**Arguments:**

- `project-name` - Name of the project directory to create (optional, will prompt if not provided)

**Options:**

- `--template=<slug>` or `-t <slug>` - Template slug to use (skips template selection)
- `--help, -h` - Show help message

**Examples:**

```bash
# Interactive mode - prompts for everything
npx fabr init

# Specify project name, choose template interactively
npx fabr init my-awesome-project

# Specify both project name and template
npx fabr init my-react-app --template=react-app

# Short form for template option
npx fabr init my-site -t static-site

# Get help for the init command
npx fabr init --help
```

**What happens when you run init:**

1. **Project name validation** - Checks if the name is valid and suggests alternatives if needed
2. **Template selection** - Shows available templates or uses the one specified
3. **Project details** - Prompts for placeholders like author name, description, etc.
4. **Template download** - Downloads the template from GitHub using degit
5. **Configuration processing** - Reads `fabr.config.json` if present
6. **Placeholder replacement** - Replaces `{{PLACEHOLDER}}` patterns in files
7. **Command execution** - Runs setup commands for command-based templates
8. **Environment setup** - Creates `.env` files if configured
9. **Dependency installation** - Runs install commands like `npm install`
10. **Cleanup** - Removes template configuration files

### `list` - Show Available Templates

Display all available templates with their details.

**Usage:**

```bash
npx fabr list [options]
```

**Options:**

- `--help, -h` - Show help message

**Examples:**

```bash
# List all templates
npx fabr list

# Get help for the list command
npx fabr list --help
```

**Output example:**

```
Available Templates:

1. React Application
   Slug: react-app
   Repository: fabr-templates/react-typescript

2. Node.js Server
   Slug: node-server
   Repository: fabr-templates/express-server

Total: 2 templates available
```

### `search` - Find Templates

Search through available templates by name, slug, or repository.

**Usage:**

```bash
npx fabr search <query> [options]
```

**Arguments:**

- `query` - Search terms to look for

**Options:**

- `--exact` - Search for exact matches only
- `--case` - Case-sensitive search
- `--help, -h` - Show help message

**Examples:**

```bash
# Basic search (case-insensitive, partial matches)
npx fabr search react

# Search for exact matches only
npx fabr search --exact chrome-ext

# Case-sensitive search
npx fabr search TypeScript --case

# Search with multiple words
npx fabr search "next js"

# Show all templates (no query)
npx fabr search

# Get help for the search command
npx fabr search --help
```

**Output example:**

```
Search Results
Query: "react"

1. React Application
   Slug: react-app
   Repository: fabr-templates/react-typescript
   Owner: fabr-templates
   Project: react-typescript

Found 1 template matching "react"

To create a project, use: npx fabr init <project-name> --template=<slug>
```

### `help` - Get Help

Show global help information or help for specific commands.

**Usage:**

```bash
npx fabr help
```

**Examples:**

```bash
# Show global help
npx fabr help

# Show help for specific commands
npx fabr init --help
npx fabr list --help
npx fabr search --help
```

**The help command shows:**

- Usage instructions
- Available commands overview
- Global options
- Common examples
- ASCII art logo

### `version` - Show Version

Display the current version of fabr.

**Usage:**

```bash
npx fabr version
```

**Examples:**

```bash
# Show version
npx fabr version

# Alternative using global flag
npx fabr --version
npx fabr -v
```

**Output example:**

```
fabr v1.2.3
```

## Common Workflows

### Quick Project Creation

If you know what you want:

```bash
# Create a React project
npx fabr init my-app -t react-app

# Create a Node.js server
npx fabr init my-api -t node-server
```

### Exploring Templates

When you're not sure what's available:

```bash
# See all templates
npx fabr list

# Search for specific technology
npx fabr search vue
npx fabr search typescript

# Create project interactively
npx fabr init
```

### Getting Help

When you need assistance:

```bash
# General help
npx fabr help

# Command-specific help
npx fabr init --help
npx fabr search --help

# Check version
npx fabr version
```

## Error Handling

Fabr provides helpful error messages and suggestions:

- **Invalid project names** - Suggests valid alternatives
- **Missing templates** - Shows available options
- **Missing arguments** - Prompts for required information
- **Network issues** - Clear error messages for download failures

## Tips and Best Practices

1. **Use descriptive project names** - Helps organize your projects
2. **Explore templates first** - Use `list` and `search` to find the right template
3. **Specify templates when scripting** - Use `-t` flag for automation
4. **Check version compatibility** - Use `version` command to ensure you're up to date
5. **Read template documentation** - Many templates have additional setup instructions

## Next Steps

Now that you know the CLI commands:

- Try the [Quick Start guide](/getting-started/quick-start) to create your first project
- Learn about [template types](/templates/overview) to understand how they work
- Explore [creating your own templates](/contributing/templates) to share your setups
