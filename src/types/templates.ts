/**
 * TypeScript interfaces for Fabr templates configuration
 * Generated from templates.schema.json
 */

export interface Template {
    /** Display name of the template */
    name: string;
    /** Unique identifier for the template */
    slug: string;
    /** GitHub repository (owner/repo format) or full URL */
    repo: string;
}

export interface TemplatesConfig {
    /** JSON Schema reference */
    $schema?: string;
    /** Array of available project templates */
    templates: Template[];
    /** The default template to select (must match a template slug) */
    defaultTemplate?: string;
}

/**
 * Find a template by its slug
 */
export function findTemplateBySlug(templates: Template[], slug: string): Template | undefined {
    return templates.find(template => template.slug === slug);
}

/**
 * Get all template slugs
 */
export function getTemplateSlugs(templates: Template[]): string[] {
    return templates.map(template => template.slug);
}

/**
 * Validate that a template slug exists in the templates array
 */
export function isValidTemplateSlug(templates: Template[], slug: string): boolean {
    return templates.some(template => template.slug === slug);
}

/**
 * Validate templates configuration
 */
export function validateTemplatesConfig(config: any): config is TemplatesConfig {
    if (!config || typeof config !== 'object') {
        return false;
    }

    if (!Array.isArray(config.templates) || config.templates.length === 0) {
        return false;
    }

    // Validate each template
    for (const template of config.templates) {
        if (!template || typeof template !== 'object') {
            return false;
        }

        if (typeof template.name !== 'string' || template.name.trim().length === 0) {
            return false;
        }

        if (typeof template.slug !== 'string' || template.slug.trim().length === 0) {
            return false;
        }

        if (typeof template.repo !== 'string' || template.repo.trim().length === 0) {
            return false;
        }

        // Validate slug pattern
        const slugPattern = /^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$/;
        if (!slugPattern.test(template.slug)) {
            return false;
        }

        // Validate repo pattern
        const repoPattern = /^([a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+)|(https?:\/\/[^\s]+)$/;
        if (!repoPattern.test(template.repo)) {
            return false;
        }
    }

    // Check for duplicate slugs
    const slugs = config.templates.map((t: any) => t.slug);
    const uniqueSlugs = new Set(slugs);
    if (slugs.length !== uniqueSlugs.size) {
        return false;
    }

    // Validate defaultTemplate if provided
    if (config.defaultTemplate && typeof config.defaultTemplate === 'string') {
        if (!isValidTemplateSlug(config.templates, config.defaultTemplate)) {
            return false;
        }
    }

    return true;
}
