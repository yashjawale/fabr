---
title: API Documentation
description: Developer reference for fabr's core functions and utilities
---

# API Documentation

This reference documents the core functions and utilities in fabr that template creators and contributors might need to understand or use.

## Core Modules

Fabr is organized into several key modules, each handling specific aspects of template processing:

### File Processing (`src/lib/files.ts`)

Handles file operations including copying, filtering, and placeholder replacement in file contents.

### Placeholder System (`src/lib/placeholders.ts`)

Manages the collection, validation, and transformation of user-provided placeholder values.

### Environment Variables (`src/lib/env.ts`) 

Generates `.env` and `.env.local` files from template configuration and user input.

### Command Execution (`src/lib/commands.ts`)

Executes shell commands for command-based templates with placeholder replacement.

### User Interface (`src/lib/ui.ts`)

Provides consistent user interaction through prompts, progress indicators, and formatted output.

### Shell Operations (`src/lib/shell.ts`)

Low-level shell command execution and process management.

## Template Configuration Types

### FabrConfig Interface

The main configuration interface for templates:

```typescript
interface FabrConfig {
  $schema?: string
  name?: string
  description?: string
  version?: string
  type?: 'files' | 'commands'
  
  placeholders?: PlaceholderConfig[]
  environmentVariables?: EnvironmentVariableConfig[]
  commands?: CommandConfig[]
  
  // Legacy properties
  preSetupCommand?: string
  postSetupCommand?: string
  installCommand?: string
  postInstallCommand?: string
  gitInit?: boolean
  removeFiles?: string[]
  files?: {
    include?: string[]
    exclude?: string[]
  }
  excludeFiles?: string[]
}
```

### Placeholder Configuration

```typescript
interface PlaceholderConfig {
  key: string
  prompt?: string
  description?: string
  default?: string
  required?: boolean
  type?: 'string' | 'boolean'
  
  // Validation
  validation?: {
    pattern?: string
    minLength?: number
    maxLength?: number
    message?: string
  }
  
  // Transformation
  transform?: {
    source: string
    case: CaseType
  }
  
  // Default case generation
  defaultCase?: {
    source: string
    case: CaseType
    template?: string
  }
}
```

### Environment Variable Configuration

```typescript
interface EnvironmentVariableConfig {
  key: string
  prompt?: string
  description?: string
  default?: string
  required?: boolean
  local?: boolean
  
  validation?: ValidationConfig
  transform?: TransformConfig
}
```

### Command Configuration

```typescript
interface CommandConfig {
  command: string
  description?: string
  workingDirectory?: string
  showOutput?: boolean
}
```

## Case Transformations

Available case transformation types:

```typescript
type CaseType = 
  | 'lower'     // 'my project name'
  | 'upper'     // 'MY PROJECT NAME'
  | 'title'     // 'My Project Name'
  | 'camel'     // 'myProjectName'
  | 'pascal'    // 'MyProjectName'
  | 'kebab'     // 'my-project-name'
  | 'snake'     // 'my_project_name'
  | 'constant'  // 'MY_PROJECT_NAME'
```

## Core Processing Flow

Understanding how fabr processes templates:

### 1. Template Download
```typescript
// Download template repository to temporary directory
const templatePath = await downloadTemplate(templateUrl)
```

### 2. Configuration Loading
```typescript
// Load and validate fabr.config.json
const config = await loadFabrConfig(templatePath)
```

### 3. Placeholder Collection
```typescript
// Prompt user for placeholder values
const placeholders = await collectPlaceholders(config.placeholders)
```

### 4. Environment Variable Collection
```typescript
// Collect environment variable values
const envVars = await collectEnvironmentVariables(config.environmentVariables, placeholders)
```

### 5. Template Processing

For file-based templates:
```typescript
// Copy files and replace placeholders
await processFileTemplate(templatePath, targetPath, placeholders, config)
```

For command-based templates:
```typescript
// Execute commands with placeholder replacement
await processCommandTemplate(targetPath, config.commands, placeholders, envVars)
```

### 6. Environment File Generation
```typescript
// Generate .env and .env.local files
await generateEnvironmentFiles(targetPath, envVars)
```

## Utility Functions

### String Transformations

```typescript
function transformCase(input: string, caseType: CaseType): string
```

Transforms a string to the specified case format.

**Example:**
```typescript
transformCase('my project name', 'pascal') // 'MyProjectName'
transformCase('my project name', 'kebab')  // 'my-project-name'
```

### Placeholder Replacement

```typescript
function replacePlaceholders(
  content: string, 
  placeholders: Record<string, string>
): string
```

Replaces `{{PLACEHOLDER}}` patterns in text with provided values.

**Example:**
```typescript
const content = 'Welcome to {{PROJECT_NAME}}!'
const placeholders = { PROJECT_NAME: 'my-app' }
replacePlaceholders(content, placeholders) // 'Welcome to my-app!'
```

### File Operations

```typescript
function copyFileWithPlaceholders(
  sourcePath: string,
  targetPath: string, 
  placeholders: Record<string, string>
): Promise<void>
```

Copies a file and replaces placeholders in its content.

### Validation

```typescript
function validateInput(
  value: string, 
  validation: ValidationConfig
): { valid: boolean; message?: string }
```

Validates user input against specified rules.

**Example:**
```typescript
const validation = {
  pattern: '^[a-z0-9-]+$',
  minLength: 3,
  maxLength: 50
}

validateInput('my-project', validation) // { valid: true }
validateInput('My Project!', validation) // { valid: false, message: '...' }
```

## Error Handling

Fabr uses structured error handling:

### FabrError Class

```typescript
class FabrError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  )
}
```

### Common Error Codes

- `TEMPLATE_NOT_FOUND` - Template repository doesn't exist
- `CONFIG_INVALID` - fabr.config.json is malformed
- `PLACEHOLDER_VALIDATION_FAILED` - User input validation failed
- `COMMAND_EXECUTION_FAILED` - Shell command failed
- `FILE_OPERATION_FAILED` - File copy/write operation failed

### Error Usage

```typescript
try {
  await processTemplate(config)
} catch (error) {
  if (error instanceof FabrError) {
    console.error(`Error ${error.code}: ${error.message}`)
    if (error.details) {
      console.error('Details:', error.details)
    }
  } else {
    console.error('Unexpected error:', error)
  }
}
```

## Command Line Interface

### Argument Parsing

Fabr uses a custom argument parser in `src/lib/args.ts`:

```typescript
interface ParsedArgs {
  command: string
  args: string[]
  flags: Record<string, string | boolean>
}

function parseArgs(argv: string[]): ParsedArgs
```

### Subcommand Interface

Commands implement the `Subcommand` interface:

```typescript
interface Subcommand {
  name: string
  description: string
  run: (args: ParsedArgs) => Promise<void>
}
```

**Example:**
```typescript
export const myCommand: Subcommand = {
  name: 'my-command',
  description: 'Does something useful',
  run: async (args) => {
    const projectName = args.args[0]
    const verbose = args.flags.verbose as boolean
    
    // Command implementation
  }
}
```

## Extending Fabr

### Adding New Commands

1. Create a new file in `src/commands/`:

```typescript
// src/commands/validate.ts
import type { Subcommand } from '../types/subcommand.js'

export const validate: Subcommand = {
  name: 'validate',
  description: 'Validate a template configuration',
  run: async (args) => {
    const configPath = args.args[0] || 'fabr.config.json'
    // Implementation
  }
}
```

2. Export it from `src/commands/index.ts`:

```typescript
export { validate } from './validate.js'
```

### Adding New Transformations

Extend the case transformation system:

```typescript
// In src/lib/placeholders.ts
function transformCase(input: string, caseType: CaseType): string {
  switch (caseType) {
    case 'reverse':
      return input.split('').reverse().join('')
    // ... existing cases
  }
}
```

### Adding New Validation Rules

Extend the validation system:

```typescript
// In validation config
interface ValidationConfig {
  pattern?: string
  minLength?: number
  maxLength?: number
  custom?: 'email' | 'url' | 'semver'  // New custom validators
  message?: string
}
```

## Testing and Development

### Manual Testing

Test template processing manually:

```typescript
import { processTemplate } from './lib/templates.js'

const config = {
  name: 'Test Template',
  placeholders: [
    { key: 'PROJECT_NAME', prompt: 'Project name' }
  ]
}

const placeholders = { PROJECT_NAME: 'test-project' }

await processTemplate('/path/to/template', '/path/to/output', config, placeholders)
```

### Debug Mode

Enable debug logging:

```bash
DEBUG=fabr* node dist/index.js init my-project
```

Or in code:

```typescript
import debug from 'debug'
const log = debug('fabr:templates')

log('Processing template:', templatePath)
```

## Performance Considerations

### File Processing

- Large files (>10MB) are skipped for placeholder replacement
- Binary files are detected and copied without processing
- Glob patterns are used efficiently for file filtering

### Memory Usage

- Templates are processed incrementally
- Large command outputs are streamed rather than buffered
- Temporary files are cleaned up after processing

### Network Operations

- Template downloads use git clone for efficiency
- Failed downloads are retried with exponential backoff
- Concurrent template processing is limited to prevent resource exhaustion

This API documentation provides the foundation for understanding and extending fabr. For specific implementation details, refer to the source code in the `/src` directory.
