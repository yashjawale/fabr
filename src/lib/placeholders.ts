import { input } from '@inquirer/prompts'
import chalk from 'chalk'
import { CaseType, Placeholder } from '../types/fabr-config.js'

/**
 * Transforms a string into various cases (kebab, pascal, camel, snake, constant).
 * Splits the input string by common delimiters (spaces, underscores, hyphens) and applies
 * the specified case transformation to create a consistently formatted output.
 *
 * @param {string} inputStr - The source string to transform
 * @param {CaseType} format - The target case format (kebab, pascal, camel, snake, constant)
 *
 * @returns {string} The transformed string in the specified case format
 */
const transformCase = (inputStr: string, format: CaseType): string => {
	const words = inputStr.split(/[\s_-]+/).filter(Boolean)
	switch (format) {
		case 'kebab':
			return words.map(w => w.toLowerCase()).join('-')
		case 'pascal':
			return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('')
		case 'camel':
			return words
				.map((w, i) =>
					i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
				)
				.join('')
		case 'snake':
			return words.map(w => w.toLowerCase()).join('_')
		case 'constant':
			return words.map(w => w.toUpperCase()).join('_')
		default:
			return inputStr
	}
}

/**
 * Processes placeholder configurations to get final values.
 * Handles both prompted placeholders (requiring user input) and derived placeholders
 * (transformed from other placeholder values). Processes prompted placeholders first,
 * then derives transformed placeholders from the collected values.
 *
 * @param {Placeholder[] | undefined} placeholderConfig - The array of placeholder configuration objects
 *
 * @returns {Promise<Record<string, string>>} A promise resolving to an object mapping placeholder keys to their final values
 */
export const processPlaceholders = async (
	placeholderConfig: Placeholder[] | undefined,
): Promise<Record<string, string>> => {
	const placeholderValues: Record<string, string> = {}
	if (!placeholderConfig || placeholderConfig.length === 0) {
		return placeholderValues
	}

	console.log(chalk.cyan('\nPlease provide values for the following placeholders:'))

	const promptedPlaceholders = placeholderConfig.filter(p => p.prompt)
	const derivedPlaceholders = placeholderConfig.filter(p => p.transform)

	for (const p of promptedPlaceholders) {
		let defaultValue: string | undefined = undefined

		if (p.defaultCase) {
			const sourceValue = placeholderValues[p.defaultCase.source]
			if (sourceValue) {
				const transformed = transformCase(sourceValue, p.defaultCase.case)
				defaultValue = p.defaultCase.template
					? p.defaultCase.template.replace('{value}', transformed)
					: transformed
			}
		}

		const answer = await input({
			message: p.prompt ?? `Enter value for ${p.key}:`,
			default: defaultValue,
			validate: (inputValue: string) => {
				if (!inputValue.trim()) {
					return 'Value cannot be empty'
				}
				return true
			},
		})

		placeholderValues[p.key] = answer
	}

	derivedPlaceholders.forEach(p => {
		if (p.transform) {
			const sourceValue = placeholderValues[p.transform.source]
			if (sourceValue) {
				placeholderValues[p.key] = transformCase(sourceValue, p.transform.case)
			} else {
				console.warn(
					chalk.yellow(
						`Warning: Source placeholder '${p.transform.source}' for derived key '${p.key}' not found.`,
					),
				)
			}
		}
	})

	return placeholderValues
}
