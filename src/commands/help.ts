import chalk from 'chalk'
import { parseSubcommandArgs, parseSubcommandOnlyArgs } from '../lib/args.js'
import { HelpContent } from '../lib/help.js'
import { BaseSubcommand, SubcommandArgs } from '../types/subcommand.js'
import { asciiArt } from '../lib/ascii.js'

type HelpArgs = SubcommandArgs

/**
 * Show global help information for the Fabr CLI.
 * Displays usage instructions, available commands, global options, and examples.
 * This function outputs formatted help text to the console.
 *
 * @returns {void}
 */
export function showGlobalHelp(): void {
	console.log(chalk.redBright.bold(asciiArt()))
	console.log(chalk.white('Usage:'))
	console.log(chalk.cyan('  npx fabr <command>') + chalk.gray('  Execute a command\n'))
	console.log(chalk.white('Available Commands:'))
	console.log(chalk.cyan('  init') + chalk.gray('    Create a new project from a template'))
	console.log(chalk.cyan('  list') + chalk.gray('    List all available templates'))
	console.log(
		chalk.cyan('  search') + chalk.gray('  Search templates by name, slug, or repository'),
	)
	console.log(chalk.cyan('  version') + chalk.gray(' Show version information'))
	console.log(chalk.cyan('  help') + chalk.gray('    Show this help message\n'))
	console.log(chalk.white('Global Options:'))
	console.log(chalk.cyan('  --help, -h') + chalk.gray('     Show help for any command'))
	console.log(chalk.cyan('  --version, -v') + chalk.gray('  Show version information\n'))
	console.log(chalk.white('Examples:'))
	console.log(
		chalk.gray('  npx fabr init                              ') + chalk.dim('# Interactive mode'),
	)
	console.log(
		chalk.gray('  npx fabr init my-project                   ') +
			chalk.dim('# Specify project name'),
	)
	console.log(
		chalk.gray('  npx fabr init my-project --template=slug   ') + chalk.dim('# Specify both'),
	)
	console.log(chalk.gray('  npx fabr list'))
	console.log(chalk.gray('  npx fabr search react'))
	console.log(chalk.gray('  npx fabr version'))
	console.log(chalk.gray('  npx fabr --version'))
	console.log(chalk.gray('  npx fabr help\n'))
}

/**
 * Show help information for the CLI
 */
export class HelpCommand extends BaseSubcommand<HelpArgs> {
	readonly name = 'help'
	readonly description = 'Show this help message'

	/**
	 * Get help content configuration for the help command.
	 * Returns usage instructions, description, and examples specific to the help command.
	 *
	 * @returns {HelpContent} Help content object with usage, description, and examples
	 *
	 * @protected
	 */
	protected getHelpContent(): HelpContent {
		return {
			usage: 'npx fabr help',
			description: this.description,
			examples: [{ command: 'npx fabr help', description: 'Show global help' }],
		}
	}

	/**
	 * Parse command line arguments for the help command.
	 * Extracts and validates arguments specific to the help command.
	 *
	 * @param {string[]} rawArgs - Raw command line arguments
	 *
	 * @returns {HelpArgs} Parsed help command arguments
	 */
	parseArgs(rawArgs: string[]): HelpArgs {
		const cleanArgs = parseSubcommandArgs(rawArgs, this.name)
		const parsed = parseSubcommandOnlyArgs(cleanArgs)

		return {
			help: parsed.help,
		}
	}

	/**
	 * Shows the help information specific to the help command.
	 * For the help command, this shows the global help.
	 *
	 * @returns {void}
	 */
	override showHelp(): void {
		// Help command always shows global help
		showGlobalHelp()
	} /**
	 * Execute the help command.
	 * Displays global help information and exits the process.
	 *
	 * @returns {Promise<void>} A promise that resolves when help is displayed
	 */
	async execute(): Promise<void> {
		showGlobalHelp()
		process.exit(0)
	}
}
