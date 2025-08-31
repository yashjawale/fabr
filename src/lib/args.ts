/**
 * Argument parsing utilities for the Fabr CLI
 */

export interface ParsedArgs {
	command?: string
	positional: string[]
	flags: Record<string, string | boolean>
	help: boolean
}

export interface SubcommandResult<T = Record<string, unknown>> {
	args: T
	help: boolean
}

/**
 * Parse command line arguments into a structured format.
 * Handles positional arguments, flags (both long and short), and help flags.
 * Supports both --key=value and --key formats for long flags.
 * Supports single-character flags like -h and -t with optional values.
 *
 * @param {string[]} args - Array of command line arguments to parse
 *
 * @returns {ParsedArgs} Structured object containing command, positional args, flags, and help status
 */
export function parseArgs(args: string[]): ParsedArgs {
	const result: ParsedArgs = {
		positional: [],
		flags: {},
		help: false,
	}

	for (let i = 0; i < args.length; i++) {
		const arg = args[i]
		if (!arg) continue

		if (arg === '--help' || arg === '-h') {
			result.help = true
		} else if (arg.startsWith('--')) {
			// Handle --key=value or --key
			const [key, ...valueParts] = arg.substring(2).split('=')
			if (!key) continue
			const value = valueParts.length > 0 ? valueParts.join('=') : true
			result.flags[key] = value
		} else if (arg.startsWith('-') && arg.length > 1) {
			// Handle short flags like -h or -t value
			const flagsStr = arg.substring(1)

			// Check if this might be a flag with a value
			const nextArg = i + 1 < args.length ? args[i + 1] : null
			const hasValue = nextArg && !nextArg.startsWith('-')

			if (flagsStr.length === 1 && hasValue) {
				// Single character flag with value: -t value
				result.flags[flagsStr] = nextArg
				i++ // Skip next argument as it's the value
			} else {
				// Handle multiple short flags or single flag without value
				const flags = flagsStr.split('')
				flags.forEach(flag => {
					if (flag === 'h') {
						result.help = true
					} else {
						result.flags[flag] = true
					}
				})
			}
		} else {
			// Positional argument
			if (!result.command) {
				result.command = arg
			} else {
				result.positional.push(arg)
			}
		}
	}

	return result
}

/**
 * Parse arguments for subcommands, treating all non-flag arguments as positional.
 * Similar to parseArgs but doesn't distinguish between command and positional arguments.
 * All non-flag arguments are treated as positional arguments for subcommands.
 *
 * @param {string[]} args - Array of command line arguments to parse
 *
 * @returns {Omit<ParsedArgs, 'command'> & { positional: string[] }} Parsed arguments without command field
 */
export function parseSubcommandOnlyArgs(
	args: string[],
): Omit<ParsedArgs, 'command'> & { positional: string[] } {
	const result = {
		positional: [] as string[],
		flags: {} as Record<string, string | boolean>,
		help: false,
	}

	for (let i = 0; i < args.length; i++) {
		const arg = args[i]
		if (!arg) continue

		if (arg === '--help' || arg === '-h') {
			result.help = true
		} else if (arg.startsWith('--')) {
			// Handle --key=value or --key
			const [key, ...valueParts] = arg.substring(2).split('=')
			if (!key) continue
			const value = valueParts.length > 0 ? valueParts.join('=') : true
			result.flags[key] = value
		} else if (arg.startsWith('-') && arg.length > 1) {
			// Handle short flags like -h or -t value
			const flagsStr = arg.substring(1)

			// Check if this might be a flag with a value
			const nextArg = i + 1 < args.length ? args[i + 1] : null
			const hasValue = nextArg && !nextArg.startsWith('-')

			if (flagsStr.length === 1 && hasValue) {
				// Single character flag with value: -t value
				result.flags[flagsStr] = nextArg
				i++ // Skip next argument as it's the value
			} else {
				// Handle multiple short flags or single flag without value
				const flags = flagsStr.split('')
				flags.forEach(flag => {
					if (flag === 'h') {
						result.help = true
					} else {
						result.flags[flag] = true
					}
				})
			}
		} else {
			// All non-flag arguments are positional for subcommands
			result.positional.push(arg)
		}
	}

	return result
}

/**
 * Generic subcommand argument parser that removes the command name from arguments.
 * If the first argument matches the command name, it removes it and returns the rest.
 * This prepares arguments for subcommand-specific parsing.
 *
 * @param {string[]} args - Original command line arguments
 * @param {string} commandName - Name of the command to remove from arguments
 *
 * @returns {string[]} Clean arguments array without the command name
 */
export function parseSubcommandArgs(args: string[], commandName: string): string[] {
	// Remove the command name if it's the first argument
	if (args[0] === commandName) {
		return args.slice(1)
	}
	return args
}

/**
 * Convert a string to a valid project name slug.
 * Applies multiple transformations to ensure the name is suitable for directory/project names:
 * - Converts to lowercase
 * - Replaces spaces with hyphens
 * - Removes invalid characters (keeps only letters, numbers, hyphens, underscores)
 * - Removes consecutive hyphens
 * - Removes leading/trailing hyphens
 * - Truncates to 100 characters
 *
 * @param {string} name - The original project name to slugify
 *
 * @returns {string} A valid project name slug
 */
export function slugifyProjectName(name: string): string {
	return (
		name
			.toLowerCase()
			.trim()
			// Replace spaces with hyphens
			.replace(/\s+/g, '-')
			// Remove invalid characters, keeping only letters, numbers, hyphens, and underscores
			.replace(/[^a-z0-9\-_]/g, '')
			// Replace multiple consecutive hyphens with single hyphen
			.replace(/-+/g, '-')
			// Remove leading/trailing hyphens
			.replace(/^-+|-+$/g, '')
			// Truncate to 100 characters
			.substring(0, 100)
			// Remove trailing hyphen if truncation created one
			.replace(/-+$/, '')
	)
}

/**
 * Validate project name format and provide suggestions if invalid.
 * Checks for empty names, invalid characters, and length limits.
 * Returns validation result with optional error message and suggested alternative.
 *
 * @param {string} name - The project name to validate
 *
 * @returns {{ valid: boolean; error?: string; suggestion?: string }} Validation result with optional error and suggestion
 */
export function validateProjectName(name: string): {
	valid: boolean
	error?: string
	suggestion?: string
} {
	if (!name) {
		return { valid: false, error: 'Project name cannot be empty.' }
	}

	const slugified = slugifyProjectName(name)

	// If the slugified version is empty after processing, it means the name was all invalid characters
	if (!slugified) {
		return {
			valid: false,
			error:
				'Project name contains no valid characters. Use letters, numbers, underscores, and hyphens only.',
			suggestion: undefined,
		}
	}

	if (!/^([A-Za-z\-_\d])+$/.test(name)) {
		return {
			valid: false,
			error: 'Project name may only include letters, numbers, underscores and hyphens.',
			suggestion: slugified !== name ? slugified : undefined,
		}
	}

	if (name.length > 100) {
		return {
			valid: false,
			error: 'Project name must be 100 characters or less.',
			suggestion: slugified !== name ? slugified : undefined,
		}
	}

	return { valid: true }
}
