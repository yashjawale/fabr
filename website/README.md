# Fabr Documentation

This directory contains the comprehensive documentation website for fabr, built with [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/).

## Documentation Structure

The documentation is organized into four main sections:

### 🚀 Getting Started
- **Introduction** - Welcome to fabr and overview of features
- **Installation** - How to install fabr on your system
- **Quick Start** - Create your first project in under a minute

### 📦 Add Your Templates
- **Overview** - Understanding template types and features
- **File-Based Templates** - Traditional file copying with placeholder replacement
- **Command-Based Templates** - Dynamic project setup using shell commands
- **Environment Variables** - Automatic .env file generation
- **Configuration Reference** - Complete fabr.config.json documentation

### 🤝 Contributing
- **How to Contribute** - Ways to help improve fabr
- **Development Setup** - Local development environment setup
- **Adding Templates** - Create and share templates with the community

### 🔧 Developer Reference
- **API Documentation** - Core functions and utilities reference
- **Architecture** - Internal design and structure
- **Generated API** - Auto-generated documentation from TypeScript source

## Building the Documentation

### Prerequisites
- Node.js 18 or higher
- npm

### Development
```bash
cd website
npm install
npm run dev
```

Visit `http://localhost:4321` to see the documentation site.

### Production Build
```bash
npm run build
```

The built site will be in the `dist/` directory.

## Contributing to Documentation

### Adding New Pages

1. Create a new `.md` file in `src/content/docs/`
2. Add frontmatter with title and description
3. Update the sidebar in `astro.config.mjs` if needed

### Writing Style

- **Keep it simple** - Use clear, straightforward language
- **Be humble** - Avoid overly promotional language
- **Include examples** - Show real code and usage patterns
- **Stay current** - Update documentation when features change

## Deployment

The documentation is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the main branch.

**Live URL:** https://yashjawale.github.io/fabr/

## Tech Stack

- **[Astro](https://astro.build/)** - Static site generator
- **[Starlight](https://starlight.astro.build/)** - Documentation theme
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD pipeline

## Getting Help

- **Astro Documentation:** https://docs.astro.build/
- **Starlight Documentation:** https://starlight.astro.build/
- **Fabr Repository:** https://github.com/yashjawale/fabr
- **Issues:** https://github.com/yashjawale/fabr/issues
