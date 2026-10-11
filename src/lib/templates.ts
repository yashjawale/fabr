/**
 * Template fetching and management utilities
 * Handles loading templates from GitHub repositories
 */

import { TemplatesConfig, validateTemplatesConfig } from '../types/templates.js'

// Default GitHub repository for templates
const DEFAULT_TEMPLATES_REPO = 'yashjawale/fabr'
const DEFAULT_TEMPLATES_PATH = 'templates.json'

/**
 * Fetch templates configuration from a GitHub repository
 */
async function fetchFromGitHub(
	repo: string = DEFAULT_TEMPLATES_REPO,
	path: string = DEFAULT_TEMPLATES_PATH,
): Promise<TemplatesConfig> {
	const url = `https://raw.githubusercontent.com/${repo}/main/${path}`

	const response = await fetch(url)
	if (!response.ok) {
		throw new Error(`Failed to fetch templates: ${response.status} ${response.statusText}`)
	}

	const data = await response.json()

	if (!validateTemplatesConfig(data)) {
		throw new Error('Invalid templates configuration format')
	}

	return data
}

/**
 * Load templates configuration from GitHub repository.
 *
 * @param options Configuration options for template loading
 * @returns Promise resolving to templates configuration
 */
export async function loadTemplates(
	options: {
		repo?: string
		path?: string
	} = {},
): Promise<TemplatesConfig> {
	const { repo = DEFAULT_TEMPLATES_REPO, path = DEFAULT_TEMPLATES_PATH } = options

	return await fetchFromGitHub(repo, path)
}
