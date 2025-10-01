#!/usr/bin/env node

// Import types
import { executeCommand } from './commands/index.js'
import { TemplatesConfig, validateTemplatesConfig } from './types/templates.js'
import { showVersion } from './commands/version.js'

// Load the list of available templates
import templatesData from './templates.json' with { type: 'json' }

// Validate templates configuration
if (!validateTemplatesConfig(templatesData)) {
	console.error('Invalid templates.json configuration')
	process.exit(1)
}

const templatesConfig = templatesData as TemplatesConfig
const templates = templatesConfig.templates

/**
 * Main entry point for the Fabr CLI application.
 * Parses command line arguments and executes the appropriate command.
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

	// Handle global help flags when no command is provided or help is explicitly requested
	if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
		await executeCommand('help', templates, args)
		return
	}

	const command = args[0]
	if (!command) {
		console.error('No command provided')
		process.exit(1)
	}
	await executeCommand(command, templates, args)
}

main()
