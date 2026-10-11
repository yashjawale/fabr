import { input } from '@inquirer/prompts'
import chalk from 'chalk'
import * as fs from 'fs'
import * as path from 'path'
import { EnvironmentVariable } from '../types/fabr-config.js'

export const processAndCreateEnvironmentFiles = async (
	variables: EnvironmentVariable[] | undefined,
	projectPath: string,
): Promise<void> => {
	const regular: string[] = []
	const local: string[] = []
	if (variables?.length) {
		console.log(chalk.cyan('\nPlease provide values for the following environment variables:'))
		for (const variable of variables) {
			const value = variable.prompt
				? await input({ message: variable.prompt, default: variable.default })
				: (variable.default ?? '')
			const target = variable.local ? local : regular
			target.push(`${variable.key}=${value}`)
		}
	}
	const files: Array<[string, string[]]> = [
		['.env', regular],
		['.env.local', local],
	]
	for (const [filename, lines] of files) {
		if (!lines.length) continue
		fs.writeFileSync(path.join(projectPath, filename), `${lines.join('\n')}\n`, 'utf8')
		console.log(chalk.green(`✓ Created ${filename}`))
	}
}
