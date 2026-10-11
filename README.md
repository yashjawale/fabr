<img src="./website/public/favicon.svg" alt="fabr" width="180" style="margin-bottom: 2rem;">
  
A simple command line utility for scaffolding new development projects
  
[![npm version](https://badge.fury.io/js/fabr.svg)](https://www.npmjs.com/package/fabr)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![GitHub issues](https://img.shields.io/github/issues/yashjawale/fabr)](https://github.com/yashjawale/fabr/issues)

[![Code Quality](https://github.com/yashjawale/fabr/actions/workflows/code-quality.yml/badge.svg)](https://github.com/yashjawale/fabr/actions/workflows/code-quality.yml)
[![Deploy Documentation](https://github.com/yashjawale/fabr/actions/workflows/docs.yml/badge.svg)](https://github.com/yashjawale/fabr/actions/workflows/docs.yml)

---

## Quick Start

Create a new project from a template:

```bash
npx fabr init my-project
```

List available templates:

```bash
npx fabr list
```

Get help:

```bash
npx fabr --help
```

> **💡 Tip:** No installation required! Use `npx` to run fabr directly.

## What Makes fabr Special?

Templates are copied from a repository, then fabr can:

- Replace `{{KEY}}` tokens in file contents
- Rename explicitly listed files
- Generate `.env` and `.env.local` files
- Run pre- and post-setup commands

## Available Templates

To see all available templates, run:

```bash
npx fabr list
```

You can also check the complete list in [templates.json](./templates.json) file, which contains all officially supported templates with their repository links.

## Configuration Examples

See the complete [example template configuration](./example.fabr.config.json), which demonstrates placeholders, file renaming, environment files, and setup commands.

### Template configuration

```json
{
	"placeholders": [
		{
			"key": "PROJECT_NAME",
			"prompt": "What's your project name?"
		}
	],
	"environmentVariables": [
		{
			"key": "API_URL",
			"prompt": "Enter API URL",
			"default": "http://localhost:3000/api",
			"local": false
		}
	]
}
```

---

## Like What You See? ⭐

If fabr helps streamline your development workflow, please consider giving it a star on GitHub! It helps others discover the project and motivates us to keep improving.

[![GitHub stars](https://img.shields.io/github/stars/yashjawale/fabr?style=social)](https://github.com/yashjawale/fabr)

---

## Documentation & Support

- 📖 **Full Documentation**: [fabr.yashjawale.dev](https://yashjawale.github.io/fabr)
- 🐛 **Found a Bug?**: [Create an issue](https://github.com/yashjawale/fabr/issues)
- 💡 **Feature Request?**: [Share your ideas](https://github.com/yashjawale/fabr/issues)
- 📋 **Configuration Schema**: Check out [`fabr.config.schema.json`](./fabr.config.schema.json) for complete reference

## Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Clone and setup**:

   ```bash
   git clone https://github.com/your-username/fabr.git
   cd fabr
   npm install
   ```

3. **Make your changes**:

   ```bash
   npm run build  # Build the project
   npm run test:cli  # Test your changes
   ```

4. **Submit a pull request**

### Development Commands

- `npm run dev` - Development mode with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run lint` - Check code style
- `npm run test:cli` - Test CLI functionality

## License

Licensed under the [GPL-3.0](LICENSE) license.

---

<a href="https://yashjawale.github.io/" target="_blank"><img style="height: 22px;" src="https://raw.githubusercontent.com/yashjawale/.github/main/docs/logo.svg" alt="Yash Jawale"/></a>
