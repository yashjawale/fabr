/**
 * TypeScript interfaces for Fabr templates configuration
 * Generated from templates.schema.json
 */

export interface Template {
	/** Display name of the template */
	name: string
	/** Unique identifier for the template */
	slug: string
	/** GitHub repository (owner/repo format) or full URL */
	repo: string
}

export interface TemplatesConfig {
	/** JSON Schema reference */
	$schema?: string
	/** Array of available project templates */
	templates: Template[]
	/** The default template to select (must match a template slug) */
	defaultTemplate?: string
}

/**
 * Find a template by its slug from an array of templates.
 * Performs a linear search through the templates array to find a matching slug.
 *
 * @param {Template[]} templates - Array of templates to search through
 * @param {string} slug - The slug to search for
 *
 * @returns {Template | undefined} The matching template object, or undefined if not found
 */
export function findTemplateBySlug(templates: Template[], slug: string): Template | undefined {
	return templates.find(template => template.slug === slug)
}

/**
 * Extract all template slugs from an array of templates.
 * Returns an array containing just the slug values from all templates.
 *
 * @param {Template[]} templates - Array of template objects
 *
 * @returns {string[]} Array of template slug strings
 */
export function getTemplateSlugs(templates: Template[]): string[] {
	return templates.map(template => template.slug)
}

/**
 * Validate that a template slug exists in the templates array.
 * Checks if any template in the provided array has the specified slug.
 *
 * @param {Template[]} templates - Array of templates to check against
 * @param {string} slug - The slug to validate
 *
 * @returns {boolean} True if the slug exists in the templates array, false otherwise
 */
export function isValidTemplateSlug(templates: Template[], slug: string): boolean {
	return templates.some(template => template.slug === slug)
}

/**
 * Validate templates configuration structure and content.
 * Performs comprehensive validation of a templates configuration object:
 * - Validates basic structure and required fields
 * - Checks template object properties (name, slug, repo)
 * - Validates slug and repository URL patterns
 * - Ensures no duplicate slugs exist
 * - Validates defaultTemplate reference if provided
 *
 * @param {unknown} config - The configuration object to validate
 *
 * @returns {config is TemplatesConfig} Type predicate indicating if the config is a valid TemplatesConfig
 */
export function validateTemplatesConfig(config: unknown): config is TemplatesConfig {
	if (!config || typeof config !== 'object') {
		return false
	}

	const configObj = config as Record<string, unknown>

	if (!Array.isArray(configObj.templates) || configObj.templates.length === 0) {
		return false
	}

	// Validate each template
	for (const template of configObj.templates) {
		if (!template || typeof template !== 'object') {
			return false
		}

		const templateObj = template as Record<string, unknown>

		if (typeof templateObj.name !== 'string' || templateObj.name.trim().length === 0) {
			return false
		}

		if (typeof templateObj.slug !== 'string' || templateObj.slug.trim().length === 0) {
			return false
		}

		if (typeof templateObj.repo !== 'string' || templateObj.repo.trim().length === 0) {
			return false
		}

		// Validate slug pattern
		const slugPattern = /^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$/
		if (!slugPattern.test(templateObj.slug)) {
			return false
		}

		// Validate repo pattern
		const repoPattern = /^([a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+)|(https?:\/\/[^\s]+)$/
		if (!repoPattern.test(templateObj.repo)) {
			return false
		}
	}

	// Check for duplicate slugs
	const slugs = configObj.templates.map((t: Record<string, unknown>) => t.slug)
	const uniqueSlugs = new Set(slugs)
	if (slugs.length !== uniqueSlugs.size) {
		return false
	}

	// Validate defaultTemplate if provided
	if (configObj.defaultTemplate && typeof configObj.defaultTemplate === 'string') {
		if (!isValidTemplateSlug(configObj.templates as Template[], configObj.defaultTemplate)) {
			return false
		}
	}

	return true
}
