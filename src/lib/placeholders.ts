import { input } from '@inquirer/prompts'
import chalk from 'chalk'
import { Placeholder } from '../types/fabr-config.js'

export const processPlaceholders = async (
	placeholders: Placeholder[] | undefined,
): Promise<Record<string, string>> => {
	const values: Record<string, string> = {}
	if (!placeholders?.length) return values

	console.log(chalk.cyan('\nPlease provide values for the following placeholders:'))
	for (const placeholder of placeholders) {
		values[placeholder.key] = await input({
			message: placeholder.prompt,
			default: placeholder.default,
		})
	}
	return values
}
