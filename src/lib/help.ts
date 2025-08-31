/**
 * Utilities for help content formatting
 */

export interface HelpContent {
	usage?: string
	description?: string
	arguments?: Array<{ name: string; description: string }>
	options?: Array<{ flag: string; description: string }>
	examples?: Array<{ command: string; description: string }>
}

/**
 * Format help content into a readable string.
 * Takes help content configuration and formats it into a structured help message
 * with sections for usage, description, arguments, options, and examples.
 * Provides consistent formatting and spacing for command help display.
 *
 * @param {string} commandName - The name of the command for which help is being formatted
 * @param {HelpContent} content - The help content object containing usage, description, etc.
 *
 * @returns {string} A formatted help string ready for console output
 */
export function formatHelpContent(commandName: string, content: HelpContent): string {
	let output = ''

	if (content.usage) {
		output += `\nUsage: ${content.usage}\n`
	} else {
		output += `\nUsage: npx fabr ${commandName} [options]\n`
	}

	if (content.description) {
		output += `\nDescription:\n  ${content.description}\n`
	}

	if (content.arguments && content.arguments.length > 0) {
		output += '\nArguments:\n'
		content.arguments.forEach(arg => {
			output += `  ${arg.name.padEnd(20)} ${arg.description}\n`
		})
	}

	if (content.options && content.options.length > 0) {
		output += '\nOptions:\n'
		content.options.forEach(opt => {
			output += `  ${opt.flag.padEnd(20)} ${opt.description}\n`
		})
	}

	if (content.examples && content.examples.length > 0) {
		output += '\nExamples:\n'
		content.examples.forEach(example => {
			const comment = example.description ? ` # ${example.description}` : ''
			output += `  ${example.command.padEnd(42)}${comment}\n`
		})
	}

	output += '\n'
	return output
}
