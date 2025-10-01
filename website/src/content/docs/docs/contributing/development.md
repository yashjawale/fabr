---
title: Development Setup
description: Set up your local development environment to contribute to fabr
---

This guide will help you set up a local development environment for contributing to fabr. By the end, you'll be able to run, test, and modify the fabr CLI locally.

## Prerequisites

Make sure you have these tools installed:

- **Node.js** 16 or higher ([download here](https://nodejs.org/))
- **npm** 7 or higher (comes with Node.js)
- **Git** ([download here](https://git-scm.com/))

Verify your installation:

```bash
node --version    # Should be 16+
npm --version     # Should be 7+
git --version     # Any recent version
```

## Clone the Repository

1. Fork the fabr repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/fabr.git
cd fabr
```

3. Add the upstream remote:

```bash
git remote add upstream https://github.com/yashjawale/fabr.git
```

## Install Dependencies

Install all project dependencies:

```bash
npm install
```

This installs:

- TypeScript and build tools
- Testing framework
- Linting and formatting tools
- Development utilities

## Build the Project

Compile TypeScript to JavaScript:

```bash
npm run build
```

This creates the `dist/` directory with compiled JavaScript files.

## Test the CLI

After building, test that the CLI works:

```bash
# Show help
node dist/index.js --help

# List available templates
node dist/index.js list

# Test creating a project (in a temp directory)
cd /tmp
node /path/to/fabr/dist/index.js init test-project
```

## Development Workflow

### 1. Development Mode

For active development, use watch mode to automatically rebuild on changes:

```bash
npm run dev
```

This starts `tsx` in watch mode, which:

- Watches for TypeScript file changes
- Automatically recompiles and restarts
- Provides instant feedback during development

### 2. Making Changes

The main source code is in the `src/` directory:

```
src/
├── index.ts              # CLI entry point
├── templates.json        # Template registry
├── commands/             # CLI command implementations
│   ├── init.ts          # Project creation logic
│   ├── list.ts          # Template listing
│   └── help.ts          # Help command
└── lib/                  # Core functionality
    ├── files.ts         # File processing
    ├── placeholders.ts  # Placeholder replacement
    ├── commands.ts      # Command execution
    └── env.ts           # Environment variables
```

### 3. Testing Your Changes

After making changes:

1. **Build the project:**

   ```bash
   npm run build
   ```

2. **Test manually:**

   ```bash
   # Test the CLI
   node dist/index.js --help
   node dist/index.js list

   # Test project creation in a temp directory
   cd /tmp && rm -rf test-fabr
   node /path/to/fabr/dist/index.js init test-fabr
   ```

3. **Check code style:**
   ```bash
   npm run lint
   npm run lint:fix  # Auto-fix style issues
   ```

## Project Structure

Understanding the codebase structure:

### Core Files

- **`src/index.ts`** - CLI entry point, argument parsing
- **`src/commands/`** - Command implementations
- **`src/lib/`** - Reusable utility functions
- **`src/types/`** - TypeScript type definitions

### Configuration

- **`package.json`** - Dependencies and scripts
- **`tsconfig.json`** - TypeScript configuration
- **`eslint.config.mjs`** - Code style rules

### Documentation

- **`README.md`** - Main project documentation
- **`docs/`** - Detailed documentation files
- **`website/`** - Starlight documentation site

## Common Development Tasks

### Adding a New Command

1. Create a new file in `src/commands/`:

   ```typescript
   // src/commands/mycommand.ts
   import type { Subcommand } from '../types/subcommand.js'

   export const mycommand: Subcommand = {
   	name: 'mycommand',
   	description: 'Description of my command',
   	run: async args => {
   		// Command implementation
   	},
   }
   ```

2. Register it in `src/commands/index.ts`:

   ```typescript
   export { mycommand } from './mycommand.js'
   ```

3. Test the new command:
   ```bash
   npm run build
   node dist/index.js mycommand
   ```

### Adding Utility Functions

Add reusable functions to `src/lib/`:

```typescript
// src/lib/myutils.ts
export function myUtility(input: string): string {
	// Implementation
	return processed
}
```

Import and use in commands:

```typescript
import { myUtility } from '../lib/myutils.js'
```

### Updating Types

Add or modify TypeScript types in `src/types/`:

```typescript
// src/types/mytypes.ts
export interface MyInterface {
	property: string
}
```

## Testing

Currently, fabr uses manual testing. When making changes:

### 1. Unit Testing

Test individual functions manually or by creating small test scripts.

### 2. Integration Testing

Test the full CLI workflow:

```bash
# Create a test project from different template types
cd /tmp
rm -rf test-*

# Test file-based template
node /path/to/fabr/dist/index.js init test-file --template=fabr-sample

# Test command-based template
node /path/to/fabr/dist/index.js init test-command --template=node-api
```

### 3. Edge Case Testing

Test error conditions:

- Invalid template URLs
- Network issues
- Invalid project names
- Missing dependencies

## Debugging

### Debug Mode

Run with debug output:

```bash
DEBUG=fabr* node dist/index.js init test-project
```

### Console Logging

Add temporary debug statements:

```typescript
console.log('Debug:', { variable, value })
```

### File System Debugging

Check what files are created:

```bash
# After creating a test project
ls -la test-project/
cat test-project/package.json
```

## Code Style

Fabr follows these conventions:

### TypeScript

- Use TypeScript for all code
- Add type annotations for function parameters and returns
- Use interfaces for object types
- Enable strict mode checking

### Code Style

- Use ESLint for code style
- 2-space indentation
- Semicolons required
- Single quotes for strings
- Trailing commas in multiline objects/arrays

### Imports

- Use `.js` extensions in import statements (required for ES modules)
- Import types with `import type`
- Group imports: Node.js built-ins, npm packages, local files

### Error Handling

- Use descriptive error messages
- Provide helpful suggestions when possible
- Exit with appropriate codes (0 for success, 1 for errors)

## Submitting Changes

When you're ready to contribute:

1. **Create a branch:**

   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make your changes** and test thoroughly

3. **Commit with clear messages:**

   ```bash
   git add .
   git commit -m "Add validation for project names"
   ```

4. **Push to your fork:**

   ```bash
   git push origin feature/my-feature
   ```

5. **Create a pull request** on GitHub

## Getting Help

If you run into issues:

- Check existing [GitHub issues](https://github.com/yashjawale/fabr/issues)
- Ask questions in your pull request
- Reach out to maintainers for guidance

## Next Steps

Now that you have fabr running locally:

1. Try the [Adding Templates guide](/contributing/templates) to create new templates
2. Look at [open issues](https://github.com/yashjawale/fabr/issues) for contribution ideas
3. Explore the codebase and experiment with changes

Happy coding! 🚀
