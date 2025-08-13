# Command-Based Templates

Fabr supports command-based templates that create projects through executing shell commands rather than copying files. This is perfect for scenarios where you want to:

- Set up projects using CLI tools (npm, yarn, create-react-app, etc.)
- Configure package.json and other files programmatically  
- Install dependencies and run setup scripts
- Generate files through commands rather than templates

## Configuration

Add `"type": "commands"` to your `fabr.config.json` and define a `commands` array:

```json
{
  "type": "commands",
  "name": "My Command Template",
  "description": "Creates a project using commands",
  "placeholders": [
    {
      "key": "PROJECT_NAME",
      "prompt": "Project name",
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

## Command Template Properties

### `command` (required)
The shell command to execute. Supports placeholder replacement using `{{PLACEHOLDER_NAME}}` syntax.

```json
{
  "command": "echo 'Hello {{PROJECT_NAME}}!' > greeting.txt"
}
```

### `description` (optional)
Human-readable description shown during execution.

```json
{
  "command": "npm install express",
  "description": "Install Express.js framework"
}
```

### `workingDirectory` (optional)
Working directory for the command (relative to project root).

```json
{
  "command": "npm init -y",
  "description": "Initialize frontend package.json",
  "workingDirectory": "./frontend"
}
```

### `showOutput` (optional, default: true)
Whether to show command output to the user.

```json
{
  "command": "npm install --silent",
  "description": "Install dependencies quietly",
  "showOutput": false
}
```

## Placeholder Replacement

Commands support the same placeholder system as file templates:

- `{{PLACEHOLDER_NAME}}` - Replaced with user input
- All placeholder features work: validation, transforms, defaults, etc.

```json
{
  "placeholders": [
    {
      "key": "PROJECT_NAME", 
      "prompt": "Project name",
      "validate": {
        "pattern": "^[a-z][a-z0-9-]*$"
      }
    },
    {
      "key": "PROJECT_TITLE",
      "transform": {
        "source": "PROJECT_NAME",
        "case": "pascal" 
      }
    }
  ],
  "commands": [
    {
      "command": "npm pkg set name={{PROJECT_NAME}}",
      "description": "Set package name"
    },
    {
      "command": "echo 'export const appName = \"{{PROJECT_TITLE}}\";' > src/constants.js",
      "description": "Create constants file"
    }
  ]
}
```

## Execution Flow

1. **Download template** - Template repository is cloned (can be empty except for `fabr.config.json`)
2. **Process placeholders** - User is prompted for values
3. **Validate commands** - Ensure all placeholders in commands have values
4. **Execute commands** - Commands run sequentially with placeholder replacement
5. **Show progress** - Real-time feedback with descriptions and completion status

## Example Output

```
🔧 Processing command-based template...

📋 Executing template commands...

[1/5] Initialize package.json
   $ npm init -y
   ✓ Completed

[2/5] Set project name
   $ npm pkg set name=my-awesome-app
   ✓ Completed

[3/5] Install Express.js framework
   $ npm install express
   added 1 package, and audited 2 packages in 1s
   ✓ Completed

✅ All commands executed successfully!
```

## Best Practices

### 1. Use descriptive command descriptions
```json
{
  "command": "mkdir -p src/components src/utils src/styles",
  "description": "Create project directory structure"
}
```

### 2. Control output visibility
```json
{
  "command": "npm install",
  "description": "Install dependencies", 
  "showOutput": true
},
{
  "command": "npm pkg set private=true",
  "description": "Set package as private",
  "showOutput": false
}
```

### 3. Use working directories for complex setups
```json
{
  "command": "create-react-app frontend",
  "description": "Create React frontend"
},
{
  "command": "npm install @types/react",
  "description": "Add TypeScript types",
  "workingDirectory": "./frontend"
}
```

### 4. Validate placeholders appropriately
```json
{
  "key": "PORT",
  "prompt": "Server port",
  "default": "3000",
  "validate": {
    "pattern": "^[0-9]+$"
  }
}
```

## Examples

See the example configuration files:
- [`example-simple-command-template.json`](../examples/example-simple-command-template.json) - Basic Node.js setup
- [`example-command-template.json`](../examples/example-command-template.json) - Advanced Express TypeScript API

## Mixed Mode

You can combine both approaches in a single template by omitting the `type` field and including both file processing and command execution. Commands will run after file processing is complete.
