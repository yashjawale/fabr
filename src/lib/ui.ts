import { input, search } from '@inquirer/prompts'
import { Template } from '../types/templates.js'

/**
 * Prompts the user for the initial project setup information.
 * Handles interactive prompting for template selection and project name if not provided.
 * Uses fuzzy search for template selection and validates project name format.
 *
 * @param {Template[]} templates - The list of available templates to choose from
 * @param {string} [providedProjectName] - Pre-provided project name (optional, will prompt if not provided)
 * @param {string} [providedTemplate] - Pre-provided template slug (optional, will prompt if not provided)
 *
 * @returns {Promise<{ template: string; projectName: string }>} A promise that resolves to the user's template and project name choices
 */
export const promptForProjectDetails = async (
	templates: Template[],
	providedProjectName?: string,
	providedTemplate?: string,
): Promise<{ template: string; projectName: string }> => {
	let template = providedTemplate
	let projectName = providedProjectName

	// Only prompt for template if not provided
	template ??= await search({
		message: 'Which project template would you like to use?',
		source: input => {
			if (!input) {
				return templates.map(t => ({ name: t.name, value: t.slug, description: t.repo }))
			}

			const filtered = templates.filter(
				t =>
					t.name.toLowerCase().includes(input.toLowerCase()) ||
					t.slug.toLowerCase().includes(input.toLowerCase()) ||
					t.repo.toLowerCase().includes(input.toLowerCase()),
			)

			return filtered.map(t => ({ name: t.name, value: t.slug, description: t.repo }))
		},
	})

	// Only prompt for project name if not provided
	projectName ??= await input({
		message: 'What is the name of your new project folder?',
		validate: (input: string) =>
			/^([A-Za-z\-_\d])+$/.test(input) ||
			'Project name may only include letters, numbers, underscores and hashes.',
	})

	return {
		template,
		projectName,
	}
}
