---
title: Environment Variables
description: Automatically generate .env files with user-provided values during project setup
---

# Environment Variables

Fabr can automatically generate `.env` and `.env.local` files during project creation. This feature makes it easy to set up database connections, API keys, and other configuration values that vary between environments.

## Basic Setup

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

When users create a project with your template, they'll be prompted for these values, and fabr will generate the appropriate `.env` files.

## Configuration Options

### Required Properties

- **`key`** - The environment variable name (must be UPPERCASE with underscores)

### Optional Properties

- **`prompt`** - Message shown when asking for this value
- **`description`** - Additional help text  
- **`default`** - Default value if user doesn't provide one
- **`required`** - Whether this variable is required (default: false)
- **`local`** - Save to `.env.local` instead of `.env` (default: false)
- **`validate`** - Validation rules for the input

## File Placement

### `.env` File (Regular Variables)
- Non-sensitive configuration
- Shared settings across team members
- Often committed to version control (with example values)

```env
DATABASE_URL=postgresql://localhost:5432/myapp
REDIS_URL=redis://localhost:6379
NODE_ENV=development
```

### `.env.local` File (Sensitive Variables) 
- Sensitive values like API keys and secrets
- Should be added to `.gitignore`
- Environment-specific sensitive data

```env
JWT_SECRET=your-super-secret-key
STRIPE_SECRET_KEY=sk_test_...
NEXTAUTH_SECRET=authentication-secret
```

## Advanced Features

### Validation

Ensure user input meets your requirements:

```json
{
  "key": "DATABASE_URL",
  "prompt": "Enter database URL",
  "required": true,
  "validate": {
    "pattern": "^postgresql://.+",
    "minLength": 20,
    "maxLength": 200,
    "message": "Must be a valid PostgreSQL connection string"
  }
}
```

### Transform from Placeholders

Generate environment variables from project placeholders:

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

### Default Values with Placeholders

Create defaults that incorporate other values:

```json
{
  "environmentVariables": [
    {
      "key": "APP_URL",
      "prompt": "Enter app URL",
      "default": "https://{{PROJECT_NAME}}.vercel.app"
    }
  ]
}
```

## Complete Example

Here's a comprehensive example for a full-stack application:

```json
{
  "name": "Full Stack App Template",
  "placeholders": [
    {
      "key": "PROJECT_NAME",
      "prompt": "What is your project name?",
      "required": true,
      "validation": {
        "pattern": "^[a-z0-9-]+$"
      }
    },
    {
      "key": "AUTHOR_EMAIL",
      "prompt": "Your email address",
      "required": true
    }
  ],
  "environmentVariables": [
    {
      "key": "DATABASE_URL",
      "prompt": "Enter your database connection URL",
      "description": "PostgreSQL connection string for your database",
      "required": true,
      "validate": {
        "pattern": "^postgresql://.+",
        "message": "Must be a valid PostgreSQL URL"
      }
    },
    {
      "key": "NEXTAUTH_SECRET",
      "prompt": "Enter NextAuth secret",
      "description": "Secret key for authentication (32+ characters)",
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
      "key": "ADMIN_EMAIL",
      "transform": {
        "source": "AUTHOR_EMAIL"
      }
    },
    {
      "key": "REDIS_URL",
      "prompt": "Enter Redis URL (optional for caching)",
      "default": "redis://localhost:6379"
    }
  ]
}
```

## Case Transformations

When using `transform`, you can apply these transformations:

- **`kebab`** - `my-project-name`
- **`pascal`** - `MyProjectName`  
- **`camel`** - `myProjectName`
- **`snake`** - `my_project_name`
- **`constant`** - `MY_PROJECT_NAME`
- **`lower`** - `my project name`
- **`upper`** - `MY PROJECT NAME`

## User Experience

When someone creates a project with your template, they'll see prompts like this:

```bash
Please provide values for environment variables:

? Enter your database connection URL postgresql://user:pass@localhost:5432/myapp
? Enter NextAuth secret (32+ characters) [hidden input]
? Enter your app URL (http://localhost:3000) 
? Enter Redis URL (optional for caching) redis://localhost:6379

✓ Created .env file with 3 variables
✓ Created .env.local file with 1 variable
```

This generates:

**`.env`:**
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/myapp
NEXTAUTH_URL=http://localhost:3000
REDIS_URL=redis://localhost:6379
DATABASE_NAME=my_app
ADMIN_EMAIL=user@example.com
```

**`.env.local`:**
```env
NEXTAUTH_SECRET=your-super-secret-key-here
```

## Best Practices

### 1. Organize by Sensitivity
```json
{
  "key": "JWT_SECRET",
  "local": true,        // ✅ Sensitive data in .env.local
  "required": true
},
{
  "key": "DATABASE_URL", // ✅ Non-sensitive in .env
  "required": true
}
```

### 2. Provide Helpful Descriptions
```json
{
  "key": "STRIPE_WEBHOOK_SECRET",
  "prompt": "Stripe webhook endpoint secret",
  "description": "Found in your Stripe dashboard under Webhooks > [endpoint] > Signing secret",
  "local": true
}
```

### 3. Use Sensible Defaults
```json
{
  "key": "PORT",
  "prompt": "Server port",
  "default": "3000"      // ✅ Good default for development
}
```

### 4. Validate Critical Values
```json
{
  "key": "DATABASE_URL",
  "validate": {
    "pattern": "^postgresql://.+",
    "message": "Must be a valid PostgreSQL connection string"
  }
}
```

### 5. Generate Related Values
```json
{
  "key": "DATABASE_NAME",
  "transform": {
    "source": "PROJECT_NAME",
    "case": "snake"      // ✅ Auto-generate from project name
  }
}
```

## Integration with Templates

Environment variables work with both template types:

- **File-based templates** - Variables are available as placeholders in files
- **Command-based templates** - Use variables in commands and generated files
- **Mixed templates** - Environment files are created before commands run

The environment variables are processed after placeholders are collected, so you can use placeholder values in environment variable defaults and transformations.

Ready to add environment variables to your templates? Check out the [configuration reference](/templates/configuration) for all available options!
