/**
 * Base interfaces and types for subcommands
 */

import { Template } from './templates.js'
import { HelpContent, formatHelpContent } from '../lib/help.js'

export interface SubcommandArgs {
	help: boolean
}

export interface SubcommandDefinition<T extends SubcommandArgs = SubcommandArgs> {
	name: string
	description: string
	parseArgs: (args: string[]) => T
	showHelp: () => void
	execute: (templates: Template[], args: T) => Promise<void>
}

/**
 * Base class for implementing subcommands with consistent structure.
 * Provides a common framework for command parsing, help display, and execution.
 * Implements the SubcommandDefinition interface with standardized behavior.
 */
export abstract class BaseSubcommand<T extends SubcommandArgs = SubcommandArgs>
	implements SubcommandDefinition<T>
{
	/**
	 * Command name - must be implemented by subclass.
	 * This should be the string used to invoke the command from the CLI.
	 */
	abstract readonly name: string

	/**
	 * Command description - must be implemented by subclass.
	 * A brief description of what the command does, used in help text.
	 */
	abstract readonly description: string

	/**
	 * Help content configuration - must be implemented by subclass.
	 * Returns help content structure for this specific command.
	 *
	 * @returns {HelpContent} Help content object with usage, description, options, and examples
	 *
	 * @protected
	 */
	protected abstract getHelpContent(): HelpContent

	/**
	 * Parse command line arguments for this specific command.
	 * Must be implemented by subclass to handle command-specific argument parsing.
	 *
	 * @param {string[]} args - Raw command line arguments
	 *
	 * @returns {T} Parsed arguments object extending SubcommandArgs
	 */
	abstract parseArgs(args: string[]): T

	/**
	 * Execute the command with parsed arguments.
	 * Must be implemented by subclass to provide the command's functionality.
	 *
	 * @param {Template[]} templates - Available templates array
	 * @param {T} args - Parsed command arguments
	 *
	 * @returns {Promise<void>} Promise that resolves when command execution is complete
	 */
	abstract execute(templates: Template[], args: T): Promise<void>

	/**
	 * Show help for this command using the help content configuration.
	 * Uses the getHelpContent() method to format and display help information.
	 *
	 * @returns {void}
	 */
	showHelp(): void {
		const helpContent = this.getHelpContent()
		console.log(formatHelpContent(this.name, helpContent))
	}

	/**
	 * Main handler that follows the common command pattern.
	 * Orchestrates the command execution workflow:
	 * 1. Parse arguments
	 * 2. Show help if requested (then exit)
	 * 3. Execute the command
	 *
	 * @param {Template[]} templates - Available templates array
	 * @param {string[]} rawArgs - Raw command line arguments
	 *
	 * @returns {Promise<void>} Promise that resolves when command handling is complete
	 */
	async handle(templates: Template[], rawArgs: string[]): Promise<void> {
		const args = this.parseArgs(rawArgs)

		if (args.help) {
			this.showHelp()
			process.exit(0)
		}

		await this.execute(templates, args)
	}
}
