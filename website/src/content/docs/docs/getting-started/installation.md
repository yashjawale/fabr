---
title: Installation
description: How to install fabr on your system
---

Fabr can be installed and used in several ways. Choose the method that works best for your workflow.

## Using npx (Recommended)

The easiest way to use fabr is with npx, which runs the latest version without installing anything globally:

```bash
npx fabr init my-project
```

This approach ensures you're always using the latest version of fabr.

## Global Installation

If you plan to use fabr frequently, you can install it globally:

```bash
npm install -g fabr
```

Then use it directly:

```bash
fabr init my-project
fabr list
fabr help
```

## Local Installation

For project-specific usage, install fabr as a development dependency:

```bash
npm install --save-dev fabr
```

Then use it with npm scripts or npx:

```bash
npx fabr init my-component
```

## System Requirements

- **Node.js**: Version 16 or higher
- **npm**: Version 7 or higher (comes with Node.js)
- **Git**: Required for downloading templates from repositories

## Verify Installation

Check that fabr is working correctly:

```bash
# Using npx
npx fabr --version

# Using global installation
fabr --version
```

You should see the current version of fabr printed to your terminal.

## Next Steps

Now that you have fabr installed, let's [create your first project](/getting-started/quick-start)!
