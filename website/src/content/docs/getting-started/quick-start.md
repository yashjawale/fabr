---
title: Quick Start
description: Create your first project with fabr in under a minute
---

# Quick Start

Let's create your first project with fabr! This guide will walk you through the basic commands and get you up and running in under a minute.

## Create Your First Project

The main command you'll use is `init`, which creates a new project from a template:

```bash
npx fabr init my-awesome-project
```

Fabr will:
1. Show you a list of available templates
2. Ask you to choose one
3. Prompt you for project details (name, description, etc.)
4. Download and set up your project
5. Create any necessary configuration files

## Choose a Template

When you run `init`, you'll see a list like this:

```
? Choose a template:
  ❯ react-app - Modern React application with TypeScript
    node-server - Express.js server with TypeScript  
    static-site - Simple HTML/CSS/JS website
    nextjs-app - Next.js application with Tailwind CSS
```

Use your arrow keys to select a template and press Enter.

## Provide Project Details

Fabr will ask you questions to customize your project:

```
? Project name: my-awesome-project
? Project description: A really awesome project
? Author name: Your Name
? Use TypeScript? Yes
```

## Alternative: Specify Template Directly

If you know which template you want, you can specify it directly:

```bash
npx fabr init my-react-app --template=react-app
```

This skips the template selection step and goes straight to the project configuration.

## Explore Available Templates

See all available templates:

```bash
npx fabr list
```

This shows you all templates with their descriptions, so you can pick the right one for your project.

## Get Help

Need help with any command?

```bash
npx fabr help
npx fabr help init  # Help for specific command
```

## What Happens Next?

After fabr creates your project:

1. **Navigate to your project**: `cd my-awesome-project`
2. **Install dependencies**: Many templates include a package.json, so run `npm install`
3. **Start coding**: Your project is ready to go!

## Example: Creating a React App

Here's a complete example of creating a React app:

```bash
# Create the project
npx fabr init my-react-app --template=react-app

# Navigate to the project
cd my-react-app

# Install dependencies
npm install

# Start development server
npm run dev
```

## Next Steps

Now that you've created your first project, you might want to:

- Learn about [file-based templates](/templates/file-based) to understand how templates work
- Explore [command-based templates](/templates/command-based) for more advanced setups
- [Create your own templates](/templates/overview) to share your favorite project configurations

Happy coding! 🚀
