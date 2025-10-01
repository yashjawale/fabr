# Fabr - Project Template Generator

Fabr is a TypeScript CLI utility for scaffolding new development projects using templates. It supports both file-based templates (traditional copy/replace) and command-based templates (programmatic setup via shell commands).

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap and Build

- Install Node.js dependencies: `npm install` -- takes 2-10 seconds
- Build TypeScript to JavaScript: `npm run build` -- takes 1.5 seconds. NEVER CANCEL. Set timeout to 30+ seconds.
- Build website documentation: `cd website && npm install && npm run build` -- takes 21 seconds total. NEVER CANCEL. Set timeout to 60+ seconds.

### Development Workflow

- Development mode with hot reload: `npm run dev` -- uses tsx watch mode
- Start built CLI: `npm run start` -- equivalent to `npm run build && node dist/index.js`
- Always run `npm run lint` and `npm run lint:fix` before committing changes
- No test suite exists currently - validate changes manually with CLI commands

### CLI Usage and Testing

- Show help: `node dist/index.js --help` or `npm run start -- --help`
- List available templates: `node dist/index.js list`
- Create project from template: `node dist/index.js init [project-name] [--template=slug]`
- Always build before testing CLI: `npm run build && node dist/index.js <command>`

### Website Development

- Website source is in `/website` directory (Astro-based documentation)
- Development server: `cd website && npm run dev` -- runs on localhost:4321
- Build website: `cd website && npm run build` -- takes 5.5 seconds. NEVER CANCEL. Set timeout to 30+ seconds.
- Preview built site: `cd website && npm run preview`

## Validation

### Required Validation Steps

- **ALWAYS** run `npm run build` and ensure it succeeds before testing changes
- **ALWAYS** run `npm run lint` to check code style - the build will fail without clean linting
- **MANUAL CLI TESTING**: Always test CLI functionality after code changes:
  1. `npm run build`
  2. `node dist/index.js --help` -- verify help displays correctly
  3. `node dist/index.js list` -- verify template list shows
  4. Test basic init workflow in /tmp directory

### End-to-End Validation Scenarios

- **Template Creation Test**: Create a test project with `node dist/index.js init test-project --template=fabr-sample` in a temporary directory
  - Verify template downloads successfully
  - Confirm project directory is created with template files
  - Check success message displays correctly
- **Command-Based Template Test**: Verify command execution works for templates with shell commands
- **Placeholder Replacement Test**: Confirm placeholder {{VARIABLE}} replacement works in both file and command templates
- **Website validation**: Ensure `cd website && npm run build` succeeds after documentation changes
- **COMPLETE VALIDATION**: Run this full scenario after any changes:
  ```bash
  cd /tmp && rm -rf test-validation-project
  node /path/to/fabr/dist/index.js init test-validation-project --template=fabr-sample
  ls -la test-validation-project/
  cat test-validation-project/README.md
  ```

### Build and Timing Expectations

- Main build: **1.5 seconds** - Set timeout to 30+ seconds minimum
- Website build: **5.5 seconds** - Set timeout to 60+ seconds minimum
- Fresh npm install: **2-10 seconds** - Set timeout to 60+ seconds minimum
- Full setup from scratch: **15-25 seconds** - Set timeout to 120+ seconds minimum
- Template download and project creation: **5-15 seconds** - Set timeout to 60+ seconds minimum
- **NEVER CANCEL** any build or install command - they are fast but may vary on different systems

## Architecture and Navigation

### Key Source Files

- `src/index.ts` - Main CLI entry point
- `src/commands/` - Command implementations (init, list, help)
- `src/lib/` - Core functionality (shell, files, placeholders, commands)
- `src/types/` - TypeScript type definitions
- `templates.json` - Available template definitions

### Key Configuration Files

- `package.json` - Main dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint configuration
- `fabr.config.schema.json` - JSON schema for template configurations
- `website/` - Astro documentation site

### Template System Architecture

- **File-based templates**: Copy files and replace `{{PLACEHOLDER}}` patterns
- **Command-based templates**: Execute shell commands with placeholder replacement
- **Environment variables**: Generate .env files from template configuration
- **Advanced placeholders**: Support validation, transformations, and computed defaults

## Common Tasks

### Making Code Changes

1. Edit TypeScript files in `src/`
2. Run `npm run build` to compile
3. Test with `node dist/index.js <command>`
4. Run `npm run lint` to check style
5. Validate end-to-end scenarios

### Adding New CLI Features

- Add command in `src/commands/` directory
- Update `src/commands/index.ts` to register the command
- Add types in `src/types/` if needed
- Always test the new command manually after building

### Updating Documentation

- Main docs in `README.md` and `docs/` directory
- Website source in `website/src/`
- Run `cd website && npm run build` to verify website builds correctly
- Update examples in `examples/` directory for new features

### Debugging Template Issues

- Check `src/lib/commands.ts` for command-based template execution
- Check `src/lib/files.ts` for file-based template processing
- Check `src/lib/placeholders.ts` for placeholder replacement logic
- Use `console.log()` debugging and rebuild to test

## Repository Structure Reference

```
/
├── .github/workflows/deploy.yml    # Website deployment
├── src/                           # TypeScript source code
│   ├── commands/                  # CLI command implementations
│   ├── lib/                       # Core utility functions
│   └── types/                     # Type definitions
├── dist/                          # Built JavaScript (after npm run build)
├── docs/                          # Documentation files
├── examples/                      # Example template configurations
├── website/                       # Astro documentation site
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript config
├── eslint.config.mjs             # Linting rules
└── templates.json                 # Available template definitions
```

## Troubleshooting

### Build Issues

- If `npm run build` fails, check TypeScript errors in the output
- If `npm run lint` fails, run `npm run lint:fix` to auto-fix style issues
- If imports fail, ensure `.js` extensions are used in import statements (required for ES modules)

### CLI Issues

- If CLI commands don't work, ensure you ran `npm run build` first
- If templates don't download, check internet connection and GitHub repository access
- If placeholder replacement fails, check the `fabr.config.json` syntax in the template

### Website Issues

- If website build fails, check for syntax errors in Astro files
- If styles are broken, verify Tailwind CSS configuration in `website/tailwind.config.js`
- If content doesn't appear, check file structure in `website/src/content/`

## Quick Reference Commands

```bash
# Core development workflow
npm install                          # Install dependencies
npm run build                        # Build TypeScript (1.5s)
npm run lint                         # Check code style
node dist/index.js --help           # Test CLI help
node dist/index.js list              # Test template listing

# Website workflow
cd website && npm install            # Install website dependencies
cd website && npm run dev            # Start dev server (localhost:4321)
cd website && npm run build          # Build website (5.5s)

# Testing and validation
npm run build && node dist/index.js init test-project --template=fabr-sample
cd /tmp && rm -rf test-validate && node /path/to/fabr/dist/index.js init test-validate --template=fabr-sample
```
