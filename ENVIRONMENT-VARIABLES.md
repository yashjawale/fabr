# Environment Variables in Fabr Templates

Fabr templates can now automatically create `.env` and `.env.local` files with user-provided values during project initialization. This feature is perfect for setting up database connections, API keys, and other configuration values that vary between environments.

## Basic Usage

Add an `environmentVariables` array to your `fabr.config.json`:

```json
{
  "name": "My Template",
  "environmentVariables": [
    {
      "key": "DATABASE_URL",
      "prompt": "Enter your database connection URL",
      "required": true
    },
    {
      "key": "API_KEY",
      "prompt": "Enter your API key",
      "local": true,
      "required": true
    }
  ]
}
```

## Environment Variable Configuration

### Required Properties

- **`key`**: The environment variable name (must match pattern `^[A-Z_][A-Z0-9_]*$`)

### Optional Properties

- **`prompt`**: Message shown when prompting for this value
- **`description`**: Additional help text for the user
- **`default`**: Default value if user doesn't provide one
- **`required`**: Whether this variable is required (default: `false`)
- **`local`**: Save to `.env.local` instead of `.env` (default: `false`)
- **`validate`**: Validation rules (pattern, minLength, maxLength)
- **`transform`**: Transform value from a placeholder
- **`defaultCase`**: Generate default by transforming a placeholder

## File Placement

### `.env` File (Regular Variables)
- Contains non-sensitive configuration
- Typically committed to version control (with example values)
- Used for shared configuration across team members

### `.env.local` File (Sensitive Variables)
- Contains sensitive values like API keys, secrets
- Should be added to `.gitignore`
- Used for environment-specific sensitive data

## Advanced Features

### 1. Validation Rules

```json
{
  "key": "DATABASE_URL",
  "prompt": "Enter database URL",
  "required": true,
  "validate": {
    "pattern": "^postgresql://.+",
    "minLength": 20,
    "maxLength": 200
  }
}
```

### 2. Transform from Placeholders

```json
{
  "placeholders": [
    {
      "key": "PROJECT_NAME",
      "prompt": "Project name",
      "required": true
    }
  ],
  "environmentVariables": [
    {
      "key": "DATABASE_NAME",
      "transform": {
        "source": "PROJECT_NAME",
        "case": "snake"
      }
    }
  ]
}
```

### 3. Default Values from Placeholders

```json
{
  "environmentVariables": [
    {
      "key": "APP_URL",
      "prompt": "Enter app URL",
      "defaultCase": {
        "source": "PROJECT_NAME",
        "case": "kebab",
        "template": "https://{value}.vercel.app"
      }
    }
  ]
}
```

## Complete Example

```json
{
  "name": "Full Stack App Template",
  "type": "commands",
  "placeholders": [
    {
      "key": "PROJECT_NAME",
      "prompt": "What is your project name?",
      "required": true
    }
  ],
  "environmentVariables": [
    {
      "key": "DATABASE_URL",
      "prompt": "Enter your database connection URL",
      "description": "PostgreSQL connection string",
      "required": true,
      "validate": {
        "pattern": "^postgresql://.+",
        "minLength": 20
      }
    },
    {
      "key": "NEXTAUTH_SECRET",
      "prompt": "Enter NextAuth secret",
      "description": "Secret key for authentication",
      "local": true,
      "required": true,
      "validate": {
        "minLength": 32
      }
    },
    {
      "key": "NEXTAUTH_URL",
      "prompt": "Enter your app URL",
      "default": "http://localhost:3000"
    },
    {
      "key": "DATABASE_NAME",
      "transform": {
        "source": "PROJECT_NAME",
        "case": "snake"
      }
    },
    {
      "key": "REDIS_URL",
      "prompt": "Enter Redis URL (optional)",
      "default": "redis://localhost:6379",
      "required": false
    }
  ],
  "commands": [
    {
      "command": "npx create-next-app@latest . --typescript",
      "description": "Create Next.js app"
    },
    {
      "command": "npm pkg set name={{PROJECT_NAME}}",
      "description": "Set package name"
    }
  ]
}
```

## Case Transformations

When using `transform` or `defaultCase`, you can apply these transformations:

- **`kebab`**: `my-project-name`
- **`pascal`**: `MyProjectName`  
- **`camel`**: `myProjectName`
- **`snake`**: `my_project_name`
- **`constant`**: `MY_PROJECT_NAME`

## Best Practices

### 1. Organize by Sensitivity
- Use `local: true` for API keys, secrets, passwords
- Use regular `.env` for database names, URLs, feature flags

### 2. Provide Good Defaults
- Set sensible defaults for development values
- Use `defaultCase` to derive values from project name

### 3. Add Helpful Descriptions
- Include examples in descriptions
- Explain what each variable is used for

### 4. Validate Input
- Use regex patterns for URLs, email formats
- Set appropriate length limits
- Mark truly required variables as `required: true`

### 5. Template Integration
- Environment variables work with both file-based and command-based templates
- Variables are processed after placeholders, so transforms work correctly
- Files are created before commands run, so commands can reference them

## Example Output

When a user runs `npx fabr init my-app`, they'll see prompts like:

```
Please provide values for the following environment variables:
? Enter your database connection URL postgresql://user:pass@localhost:5432/myapp
? Enter NextAuth secret (32+ characters) [hidden input]
? Enter your app URL (http://localhost:3000) 
? Enter Redis URL (optional) redis://localhost:6379

✓ Created .env file with 3 variables
✓ Created .env.local file with 1 variables
```

This creates:

**`.env`**:
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/myapp
NEXTAUTH_URL=http://localhost:3000
REDIS_URL=redis://localhost:6379
DATABASE_NAME=my_app
```

**`.env.local`**:
```env
NEXTAUTH_SECRET=your-super-secret-key-here
```

## Template Examples

- [Full Stack Next.js Example](./example-env-template.json) - Complete setup with database, auth, and caching
- [Simple API Example](./example-simple-env-template.json) - Basic environment variables for an API project
