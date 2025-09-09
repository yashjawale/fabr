import chalk from 'chalk'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { parseSubcommandArgs, parseSubcommandOnlyArgs } from '../lib/args.js'
import { HelpContent } from '../lib/help.js'
import { BaseSubcommand, SubcommandArgs } from '../types/subcommand.js'

type VersionArgs = SubcommandArgs

/**
 * Get the version from package.json
 * @returns {string} The version string
 */
function getVersion(): string {
	try {
		// Get the current file's directory
		const __filename = fileURLToPath(import.meta.url)
		const __dirname = dirname(__filename)

		// Go up to the project root and read package.json
		const packagePath = join(__dirname, '../../package.json')
		const packageData = JSON.parse(readFileSync(packagePath, 'utf-8'))
		return packageData.version
	} catch (error) {
		console.error('Error reading version:', error)
		return 'unknown'
	}
}

/**
 * Show version information for the Fabr CLI.
 * Displays the current version number.
 *
 * @returns {void}
 */
export function showVersion(): void {
	const version = getVersion()
	console.log(chalk.redBright.bold(`fabr v${version}`))
}

/**
 * Show version information for the CLI
 */
export class VersionCommand extends BaseSubcommand<VersionArgs> {
	readonly name = 'version'
	readonly description = 'Show version information'

	/**
	 * Get help content configuration for the version command.
	 * Returns usage instructions, description, and examples specific to the version command.
	 *
	 * @returns {HelpContent} Help content object with usage, description, and examples
	 *
	 * @protected
	 */
	protected getHelpContent(): HelpContent {
		return {
			usage: 'npx fabr version',
			description: this.description,
			examples: [{ command: 'npx fabr version', description: 'Show current version' }],
		}
	}

	/**
	 * Parse command line arguments for the version command.
	 * Extracts and validates arguments specific to the version command.
	 *
	 * @param {string[]} rawArgs - Raw command line arguments
	 *
	 * @returns {VersionArgs} Parsed version command arguments
	 */
	parseArgs(rawArgs: string[]): VersionArgs {
		const cleanArgs = parseSubcommandArgs(rawArgs, this.name)
		const parsed = parseSubcommandOnlyArgs(cleanArgs)

		return {
			help: parsed.help,
		}
	}

	/**
	 * Execute the version command.
	 * Displays version information and exits the process.
	 *
	 * @returns {Promise<void>} A promise that resolves when version is displayed
	 */
	async execute(): Promise<void> {
		showVersion()
		process.exit(0)
	}
}
