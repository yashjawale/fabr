#!/usr/bin/env node

// Import types
import { executeCommand } from './commands/index.js'
import { showVersion } from './commands/version.js'
import { loadTemplates } from './lib/templates.js'
import chalk from 'chalk'

/**
 * Main entry point for the Fabr CLI application.
 * Loads templates from GitHub repository and parses command line arguments.
 * Handles global help flags and routes commands to their respective handlers.
 *
 * @returns {Promise<void>} A promise that resolves when the command execution is complete
 */
async function main(): Promise<void> {
	const args = process.argv.slice(2)

	// Handle global version flags
	if (args.includes('--version') || args.includes('-v')) {
		showVersion()
		return
	}

	try {
		// Load templates from GitHub
		const templatesConfig = await loadTemplates()
		const templates = templatesConfig.templates

		// Handle global help flags when no command is provided or help is explicitly requested
		if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
			await executeCommand('help', templates, args)
			return
		}

		const command = args[0]
		if (!command) {
			console.error(chalk.red('No command provided'))
			process.exit(1)
		}

		await executeCommand(command, templates, args)
	} catch (error) {
		console.error(
			chalk.red('Failed to load templates:'),
			error instanceof Error ? error.message : 'Unknown error',
		)
		process.exit(1)
	}
}

main()
