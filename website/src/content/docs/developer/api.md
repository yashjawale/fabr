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

#### `walkDir(dirPath: string): string[]`

Recursively walks a directory and returns all file paths. Traverses the directory tree while excluding common build/version control directories.

**Parameters:**
- `dirPath` - The directory path to walk recursively

**Returns:** An array of absolute file paths found in the directory tree

**Example:**
```typescript
const files = walkDir('/path/to/template')
// Returns: ['/path/to/template/package.json', '/path/to/template/src/index.ts', ...]
```

**Excluded directories:** `node_modules`, `.git`, `dist`

#### `findAndReplace(projectPath: string, placeholderValues: Record<string, string>): void`

Finds and replaces placeholder values in all files within a directory. Recursively processes all files in the project directory, searching for placeholder patterns and replacing them with their corresponding values.

**Parameters:**
- `projectPath` - The root path of the project directory to process
- `placeholderValues` - An object mapping placeholder keys to their replacement values

**Example:**
```typescript
const placeholders = {
  '{{PROJECT_NAME}}': 'my-awesome-app',
  '{{AUTHOR_NAME}}': 'John Doe'
}

findAndReplace('/path/to/project', placeholders)
// All files will have placeholders replaced with actual values
```

**Behavior:**
- Only writes files back if changes were made
- Processes all files except those in excluded directories
- Uses global regex replacement for thorough placeholder substitution

### Placeholder System (`src/lib/placeholders.ts`)

Manages the collection, validation, and transformation of user-provided placeholder values.

#### `transformCase(inputStr: string, format: CaseType): string`

Transforms a string into various cases (kebab, pascal, camel, snake, constant). Splits the input string by common delimiters and applies the specified case transformation.

**Parameters:**
- `inputStr` - The source string to transform
- `format` - The target case format

**Case Types:**
- `kebab` - `my-project-name`
- `pascal` - `MyProjectName`
- `camel` - `myProjectName`
- `snake` - `my_project_name`
- `constant` - `MY_PROJECT_NAME`

**Example:**
```typescript
transformCase('My Awesome Project', 'kebab')    // 'my-awesome-project'
transformCase('my-awesome-project', 'pascal')   // 'MyAwesomeProject'
transformCase('MyAwesomeProject', 'snake')      // 'my_awesome_project'
transformCase('my_awesome_project', 'constant') // 'MY_AWESOME_PROJECT'
```

#### `processPlaceholders(placeholderConfig: Placeholder[]): Promise<Record<string, string>>`

Processes placeholder configurations to get final values. Handles both prompted placeholders (requiring user input) and derived placeholders (transformed from other placeholder values).

**Parameters:**
- `placeholderConfig` - Array of placeholder configuration objects

**Returns:** Promise resolving to an object mapping placeholder keys to their final values

**Processing Flow:**
1. Filter placeholders into prompted and derived types
2. Collect user input for prompted placeholders
3. Generate derived placeholder values from transformations
4. Return complete placeholder value map

**Example:**
```typescript
const config = [
  {
    key: 'PROJECT_NAME',
    prompt: 'Enter project name:'
  },
  {
    key: 'COMPONENT_NAME',
    transform: {
      source: 'PROJECT_NAME',
      case: 'pascal'
    }
  }
]

const values = await processPlaceholders(config)
// User enters "my-awesome-app"
// Returns: { PROJECT_NAME: 'my-awesome-app', COMPONENT_NAME: 'MyAwesomeApp' }
```

### Environment Variables (`src/lib/env.ts`)

Generates `.env` and `.env.local` files from template configuration and user input.

#### `transformCase(inputStr: string, format: CaseType): string`

Same transformation function as in placeholders module, used for environment variable value generation.

#### `collectEnvironmentVariables(envVarConfig: EnvironmentVariable[], placeholderValues: Record<string, string>): Promise<{ regular: Record<string, string>; local: Record<string, string> }>`

Collects environment variable values from user input and transformations. Processes environment variable configurations to generate values for both regular and local environment files.

**Parameters:**
- `envVarConfig` - Array of environment variable configuration objects
- `placeholderValues` - Existing placeholder values for transformations

**Returns:** Object containing regular and local environment variables

**Example:**
```typescript
const envConfig = [
  {
    key: 'DATABASE_URL',
    prompt: 'Enter database URL:',
    default: 'sqlite:///app.db'
  },
  {
    key: 'JWT_SECRET',
    prompt: 'Enter JWT secret:',
    local: true,
    required: true
  }
]

const result = await collectEnvironmentVariables(envConfig, placeholders)
// Returns: {
//   regular: { DATABASE_URL: 'postgresql://...' },
//   local: { JWT_SECRET: 'secret-key' }
// }
```

#### `generateEnvironmentFiles(projectPath: string, regularEnvVars: Record<string, string>, localEnvVars: Record<string, string>): void`

Creates `.env` and `.env.local` files in the project directory with the provided environment variables.

**Parameters:**
- `projectPath` - The path to the project directory where files will be created
- `regularEnvVars` - Environment variables for .env file
- `localEnvVars` - Environment variables for .env.local file

**Example:**
```typescript
generateEnvironmentFiles(
  '/path/to/project',
  { DATABASE_URL: 'postgresql://localhost:5432/myapp' },
  { JWT_SECRET: 'super-secret-key' }
)

// Creates:
// .env with: DATABASE_URL=postgresql://localhost:5432/myapp
// .env.local with: JWT_SECRET=super-secret-key
```

### Command Execution (`src/lib/commands.ts`)

Executes shell commands for command-based templates with placeholder replacement.

### User Interface (`src/lib/ui.ts`)

Provides consistent user interaction through prompts, progress indicators, and formatted output.

#### `promptForProjectDetails(templates: Template[], providedProjectName?: string, providedTemplate?: string): Promise<{ template: string; projectName: string }>`

Prompts the user for initial project setup information. Handles interactive prompting for template selection and project name if not provided.

**Parameters:**
- `templates` - The list of available templates to choose from
- `providedProjectName` - Pre-provided project name (optional)
- `providedTemplate` - Pre-provided template slug (optional)

**Returns:** Promise resolving to the user's template and project name choices

**Features:**
- Fuzzy search for template selection
- Project name validation
- Skips prompts if values are pre-provided

**Example:**
```typescript
const templates = [
  { slug: 'react-app', name: 'React App', repo: 'https://github.com/...' }
]

const result = await promptForProjectDetails(templates)
// User selects template and enters project name
// Returns: { template: 'react-app', projectName: 'my-new-project' }
```

### Shell Operations (`src/lib/shell.ts`)

Low-level shell command execution and process management.

## Template Configuration Types

### FabrConfig Interface

The main configuration interface for templates:

```typescript
interface FabrConfig {
  $schema?: string                      // JSON schema reference
  name?: string                         // Template display name
  description?: string                  // Template description
  version?: string                      // Template version (semver)
  type?: 'files' | 'commands'          // Template type

  placeholders?: PlaceholderConfig[]    // Placeholder definitions
  environmentVariables?: EnvironmentVariableConfig[]  // Environment variable definitions
  commands?: CommandConfig[]            // Commands for command-based templates

  // Legacy properties for backward compatibility
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
  key: string                          // Placeholder key (UPPERCASE_WITH_UNDERSCORES)
  prompt?: string                      // User prompt message
  description?: string                 // Additional help text
  default?: string                     // Default value
  required?: boolean                   // Whether required (default: false)
  type?: 'string' | 'boolean'         // Input type (default: 'string')

  // Validation rules
  validation?: {
    pattern?: string                   // Regex pattern
    minLength?: number                 // Minimum length
    maxLength?: number                 // Maximum length
    message?: string                   // Custom error message
  }

  // Value transformation from another placeholder
  transform?: {
    source: string                     // Source placeholder key
    case: CaseType                     // Target case format
  }

  // Smart default generation
  defaultCase?: {
    source: string                     // Source placeholder key
    case: CaseType                     // Target case format
    template?: string                  // Template with {value} placeholder
  }
}
```

### Environment Variable Configuration

```typescript
interface EnvironmentVariableConfig {
  key: string                          // Environment variable name (UPPERCASE_WITH_UNDERSCORES)
  prompt?: string                      // User prompt message
  description?: string                 // Additional help text
  default?: string                     // Default value (can include placeholders)
  required?: boolean                   // Whether required (default: false)
  local?: boolean                      // Save to .env.local instead of .env (default: false)

  validation?: ValidationConfig        // Input validation rules
  transform?: TransformConfig          // Value transformation from placeholder
}
```

### Command Configuration

```typescript
interface CommandConfig {
  command: string                      // Shell command to execute (supports placeholders)
  description?: string                 // Human-readable description
  workingDirectory?: string            // Working directory (relative to project root)
  showOutput?: boolean                 // Whether to show command output (default: true)
}
```

## Case Transformations

Available case transformation types with examples:

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

**Usage in configurations:**
```json
{
  "key": "COMPONENT_NAME",
  "transform": {
    "source": "PROJECT_NAME",
    "case": "pascal"
  }
}
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
const placeholders = await processPlaceholders(config.placeholders)
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
await generateEnvironmentFiles(targetPath, envVars.regular, envVars.local)
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
transformCase('MyProjectName', 'snake')    // 'my_project_name'
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
  maxLength: 50,
  message: 'Must be lowercase with hyphens only'
}

validateInput('my-project', validation) // { valid: true }
validateInput('My Project!', validation) // { valid: false, message: '...' }
```

## Error Handling

Fabr uses structured error handling for clear error categorization and user-friendly messages.

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

- `TEMPLATE_NOT_FOUND` - Template repository doesn't exist or is inaccessible
- `CONFIG_INVALID` - fabr.config.json is malformed or missing required fields
- `PLACEHOLDER_VALIDATION_FAILED` - User input validation failed
- `COMMAND_EXECUTION_FAILED` - Shell command failed during execution
- `FILE_OPERATION_FAILED` - File copy/write operation failed
- `NETWORK_ERROR` - Network-related issues during template download

### Error Usage Example

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
  command: string                        // Main command (init, list, help)
  args: string[]                        // Positional arguments
  flags: Record<string, string | boolean> // Named flags (--template, --verbose)
}

function parseArgs(argv: string[]): ParsedArgs
```

**Example:**
```bash
fabr init my-project --template=react-app --verbose
```

Parses to:
```typescript
{
  command: 'init',
  args: ['my-project'],
  flags: { template: 'react-app', verbose: true }
}
```

### Subcommand Interface

Commands implement the `Subcommand` interface:

```typescript
interface Subcommand {
  name: string                          // Command name
  description: string                   // Help text description
  run: (args: ParsedArgs) => Promise<void> // Command implementation
}
```

**Example Implementation:**
```typescript
export const myCommand: Subcommand = {
  name: 'my-command',
  description: 'Does something useful',
  run: async (args) => {
    const projectName = args.args[0]
    const verbose = args.flags.verbose as boolean

    if (!projectName) {
      throw new FabrError('Project name is required', 'MISSING_ARGUMENT')
    }

    // Command implementation
    console.log(`Processing project: ${projectName}`)
  }
}
```

## Extending Fabr

### Adding New Commands

1. Create a new file in `src/commands/`:

```typescript
// src/commands/validate.ts
import type { Subcommand } from '../types/subcommand.js'
import { loadFabrConfig } from '../lib/config.js'

export const validate: Subcommand = {
  name: 'validate',
  description: 'Validate a template configuration',
  run: async (args) => {
    const configPath = args.args[0] || 'fabr.config.json'

    try {
      const config = await loadFabrConfig(configPath)
      console.log('✅ Configuration is valid')
      console.log(`Template: ${config.name || 'Unnamed'}`)
      console.log(`Type: ${config.type || 'files'}`)
      console.log(`Placeholders: ${config.placeholders?.length || 0}`)
    } catch (error) {
      console.error('❌ Configuration validation failed:', error.message)
      process.exit(1)
    }
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
  const words = input.split(/[\s_-]+/).filter(Boolean)

  switch (caseType) {
    case 'reverse':
      return input.split('').reverse().join('')
    case 'capitalize':
      return words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    // ... existing cases
    default:
      return input
  }
}
```

Update the CaseType:
```typescript
type CaseType =
  | 'lower' | 'upper' | 'title' | 'camel' | 'pascal'
  | 'kebab' | 'snake' | 'constant'
  | 'reverse' | 'capitalize'  // New transformations
```

### Adding New Validation Rules

Extend the validation system:

```typescript
interface ValidationConfig {
  pattern?: string                      // Regex pattern
  minLength?: number                    // Minimum length
  maxLength?: number                    // Maximum length
  custom?: 'email' | 'url' | 'semver'  // New custom validators
  message?: string                      // Custom error message
}
```

Implement custom validators:
```typescript
function validateInput(value: string, validation: ValidationConfig): ValidationResult {
  // ... existing validation

  if (validation.custom) {
    switch (validation.custom) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          return { valid: false, message: 'Please enter a valid email address' }
        }
        break
      case 'url':
        try {
          new URL(value)
        } catch {
          return { valid: false, message: 'Please enter a valid URL' }
        }
        break
      case 'semver':
        const semverRegex = /^\d+\.\d+\.\d+(-[a-zA-Z0-9-]+)?$/
        if (!semverRegex.test(value)) {
          return { valid: false, message: 'Please enter a valid semantic version (x.y.z)' }
        }
        break
    }
  }

  return { valid: true }
}
```

## Performance Considerations

### File Processing

- **Large files (>10MB)** are skipped for placeholder replacement to avoid memory issues
- **Binary files** are automatically detected and copied without processing
- **Glob patterns** are used efficiently for file filtering to minimize disk I/O
- **Concurrent processing** of independent files when possible

### Memory Usage

- **Incremental processing** - Templates are processed file by file rather than loading everything into memory
- **Streaming** - Large command outputs are streamed rather than buffered
- **Cleanup** - Temporary files and directories are cleaned up immediately after use
- **Lazy loading** - Modules are loaded only when needed

### Network Operations

- **Efficient cloning** - Template downloads use `git clone --depth 1` for faster downloads
- **Retry logic** - Failed downloads are retried with exponential backoff
- **Concurrent limits** - Template processing is limited to prevent resource exhaustion
- **Caching** - Recently used templates may be cached locally (future enhancement)

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
log('Placeholders:', placeholders)
```

### Testing Different Template Types

```typescript
// Test file-based template
const fileConfig = {
  type: 'files',
  placeholders: [...]
}

// Test command-based template
const commandConfig = {
  type: 'commands',
  commands: [...],
  placeholders: [...]
}

// Test hybrid template
const hybridConfig = {
  // No type specified - processes files then commands
  placeholders: [...],
  commands: [...]
}
```

This comprehensive API documentation provides the foundation for understanding and extending fabr. For specific implementation details and the latest changes, refer to the source code in the `/src` directory.
