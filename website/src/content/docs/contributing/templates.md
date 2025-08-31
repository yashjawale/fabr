---
title: Adding Templates
description: Learn how to create and share templates with the fabr community
---

# Adding Templates

Creating and sharing templates is one of the best ways to contribute to fabr! This guide will walk you through creating templates and getting them added to the official template registry.

## Creating Your First Template

### 1. Choose Your Template Type

Decide what kind of template you want to create:

- **File-based template** - Copy files and replace placeholders (good for boilerplate code)
- **Command-based template** - Use CLI tools like `create-react-app` (good for dynamic setup)
- **Hybrid template** - Combine both approaches

### 2. Set Up Your Template Repository

Create a new GitHub repository for your template:

```bash
# Create a new repository
mkdir my-awesome-template
cd my-awesome-template
git init
```

### 3. Create the Template Configuration

Add a `fabr.config.json` file in your repository root:

```json
{
  "$schema": "https://raw.githubusercontent.com/yashjawale/fabr/main/fabr.config.schema.json",
  "name": "My Awesome Template",
  "description": "A great starting point for awesome projects",
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
      "key": "AUTHOR_NAME",
      "prompt": "Your name",
      "default": "Developer"
    }
  ]
}
```

### 4. Add Your Template Files

For file-based templates, add your project files with placeholders:

**package.json:**
```json
{
  "name": "{{PROJECT_NAME}}",
  "version": "1.0.0",
  "author": "{{AUTHOR_NAME}}"
}
```

**README.md:**
```markdown
# {{PROJECT_NAME}}

Created by {{AUTHOR_NAME}}

## Getting Started

Welcome to your new project!
```

### 5. Test Your Template Locally

Before sharing, test your template:

```bash
# In a temporary directory
cd /tmp
rm -rf test-template

# Test with your repository URL
npx fabr init test-template --template=https://github.com/yourusername/my-awesome-template

# Check the results
ls -la test-template/
cat test-template/package.json
```

## Template Best Practices

### 1. Clear Configuration

Use descriptive names and helpful prompts:

```json
{
  "name": "React TypeScript Component Library",
  "description": "Reusable React components with TypeScript, testing, and Storybook",
  "placeholders": [
    {
      "key": "LIBRARY_NAME",
      "prompt": "What's your component library name?",
      "description": "This will be used as the npm package name",
      "required": true,
      "validation": {
        "pattern": "^@?[a-z0-9-]+(/[a-z0-9-]+)?$",
        "message": "Must be a valid npm package name"
      }
    }
  ]
}
```

### 2. Sensible Defaults

Provide defaults that work out of the box:

```json
{
  "key": "PORT",
  "prompt": "Server port",
  "default": "3000"
},
{
  "key": "DATABASE_URL", 
  "prompt": "Database connection string",
  "default": "sqlite:///app.db"
}
```

### 3. Good Documentation

Include a comprehensive README.md in your template:

```markdown
# {{PROJECT_NAME}}

## What's Included

- TypeScript configuration
- ESLint and Prettier setup
- Jest testing framework
- GitHub Actions CI/CD

## Getting Started

1. Install dependencies: `npm install`
2. Start development: `npm run dev`
3. Run tests: `npm test`

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/          # Application pages  
├── utils/          # Utility functions
└── types/          # TypeScript types
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Check code style

## Customization

### Environment Variables

Copy `.env.example` to `.env` and update values:

```env
PORT={{PORT}}
DATABASE_URL={{DATABASE_URL}}
```
```

### 4. Validation and Error Handling

Validate user input appropriately:

```json
{
  "key": "PROJECT_NAME",
  "validation": {
    "pattern": "^[a-z0-9-]+$",
    "minLength": 3,
    "maxLength": 50,
    "message": "Project name must be 3-50 characters, lowercase letters, numbers, and hyphens only"
  }
},
{
  "key": "AUTHOR_EMAIL",
  "validation": {
    "pattern": "^[\\w\\.-]+@[\\w\\.-]+\\.[a-zA-Z]{2,}$",
    "message": "Please enter a valid email address"
  }
}
```

### 5. Security Best Practices

For environment variables:

```json
{
  "environmentVariables": [
    {
      "key": "API_URL",
      "prompt": "API endpoint URL",
      "default": "http://localhost:3001/api"
    },
    {
      "key": "JWT_SECRET",
      "prompt": "JWT secret key (keep this secure!)",
      "local": true,
      "required": true,
      "validation": {
        "minLength": 32,
        "message": "JWT secret must be at least 32 characters"
      }
    }
  ]
}
```

## Example Templates

Here are some template ideas to get you started:

### React Component Library

```json
{
  "name": "React Component Library",
  "description": "TypeScript React components with Storybook and testing",
  "placeholders": [
    {
      "key": "LIBRARY_NAME",
      "prompt": "Component library name",
      "required": true
    },
    {
      "key": "AUTHOR_NAME", 
      "prompt": "Your name",
      "required": true
    }
  ]
}
```

### Express API Server

```json
{
  "type": "commands",
  "name": "Express TypeScript API",
  "description": "Express.js API with TypeScript, authentication, and testing",
  "placeholders": [
    {
      "key": "API_NAME",
      "prompt": "API name",
      "required": true
    }
  ],
  "commands": [
    {
      "command": "npm init -y",
      "description": "Initialize package.json"
    },
    {
      "command": "npm install express cors helmet dotenv",
      "description": "Install dependencies"
    }
  ]
}
```

### Static Site Generator

```json
{
  "name": "Static Site with Vite",
  "description": "Static website with Vite, TypeScript, and Tailwind CSS",
  "placeholders": [
    {
      "key": "SITE_NAME",
      "prompt": "Site name",
      "required": true
    },
    {
      "key": "SITE_DESCRIPTION",
      "prompt": "Site description",
      "default": "A beautiful static website"
    }
  ]
}
```

## Submitting to the Official Registry

Once your template is ready, you can submit it to be included in fabr's official template registry.

### 1. Prepare Your Submission

Make sure your template has:

- ✅ Clear, descriptive name and description
- ✅ Comprehensive `fabr.config.json`
- ✅ Good README.md documentation
- ✅ Working examples and tests
- ✅ Appropriate LICENSE file
- ✅ Clean repository (no sensitive data)

### 2. Test Thoroughly

Test your template with different inputs:

```bash
# Test with minimal input
npx fabr init test-minimal --template=your-repo-url

# Test with different project names
npx fabr init test-kebab-case --template=your-repo-url
npx fabr init test_snake_case --template=your-repo-url

# Test validation
# (Try invalid project names to ensure validation works)
```

### 3. Submit a Pull Request

1. Fork the [fabr repository](https://github.com/yashjawale/fabr)

2. Add your template to `src/templates.json`:

```json
{
  "templates": [
    {
      "slug": "my-awesome-template",
      "name": "My Awesome Template", 
      "description": "A great starting point for awesome projects",
      "repository": "https://github.com/yourusername/my-awesome-template",
      "tags": ["typescript", "react", "testing"],
      "author": "Your Name",
      "featured": false
    }
  ]
}
```

3. Create a pull request with:
   - Clear description of what your template does
   - Link to your template repository
   - Screenshots or examples if helpful

### 4. Template Review Process

Our maintainers will review your template for:

- **Functionality** - Does it work correctly?
- **Quality** - Is the code well-structured and documented?
- **Usefulness** - Will other developers find this valuable?
- **Uniqueness** - Does it offer something new or different?
- **Security** - Are there any security concerns?

## Template Maintenance

After your template is accepted:

### Keep It Updated

- Update dependencies regularly
- Fix bugs reported by users
- Add new features based on feedback
- Keep documentation current

### Respond to Issues

- Monitor your template repository for issues
- Respond to user questions
- Fix bugs promptly
- Consider feature requests

### Version Your Template

Use semantic versioning for your template:

```json
{
  "version": "1.2.0"
}
```

Update the version when you make changes:
- **Patch** (1.2.1) - Bug fixes
- **Minor** (1.3.0) - New features, backward compatible
- **Major** (2.0.0) - Breaking changes

## Community Templates

Even if your template isn't included in the official registry, you can still share it:

### Share Your Repository URL

Users can create projects directly from your repository:

```bash
npx fabr init my-project --template=https://github.com/yourusername/my-template
```

### Create Template Collections

Organize related templates in a single repository with subdirectories:

```
my-templates/
├── react-app/
│   └── fabr.config.json
├── vue-app/
│   └── fabr.config.json
└── node-api/
    └── fabr.config.json
```

### Write Tutorials

Create blog posts or tutorials showing how to use your templates.

## Getting Help

Need help creating templates?

- Check the [configuration reference](/templates/configuration)
- Look at [existing templates](https://github.com/yashjawale/fabr/tree/main/src/templates.json) for inspiration
- Ask questions in [GitHub discussions](https://github.com/yashjawale/fabr/discussions)
- Open an issue if you find bugs or need features

Ready to create your first template? Start simple and gradually add more features. The fabr community is here to help! 🚀
