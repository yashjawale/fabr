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
export function validateTemplatesConfig(config: unknown): config is TemplatesConfig {
    if (!config || typeof config !== 'object') {
        return false;
    }

    const configObj = config as Record<string, unknown>;

    if (!Array.isArray(configObj.templates) || configObj.templates.length === 0) {
        return false;
    }

    // Validate each template
    for (const template of configObj.templates) {
        if (!template || typeof template !== 'object') {
            return false;
        }

        const templateObj = template as Record<string, unknown>;

        if (typeof templateObj.name !== 'string' || templateObj.name.trim().length === 0) {
            return false;
        }

        if (typeof templateObj.slug !== 'string' || templateObj.slug.trim().length === 0) {
            return false;
        }

        if (typeof templateObj.repo !== 'string' || templateObj.repo.trim().length === 0) {
            return false;
        }

        // Validate slug pattern
        const slugPattern = /^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$/;
        if (!slugPattern.test(templateObj.slug)) {
            return false;
        }

        // Validate repo pattern
        const repoPattern = /^([a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+)|(https?:\/\/[^\s]+)$/;
        if (!repoPattern.test(templateObj.repo)) {
            return false;
        }
    }

    // Check for duplicate slugs
    const slugs = configObj.templates.map((t: Record<string, unknown>) => t.slug);
    const uniqueSlugs = new Set(slugs);
    if (slugs.length !== uniqueSlugs.size) {
        return false;
    }

    // Validate defaultTemplate if provided
    if (configObj.defaultTemplate && typeof configObj.defaultTemplate === 'string') {
        if (!isValidTemplateSlug(configObj.templates as Template[], configObj.defaultTemplate)) {
            return false;
        }
    }

    return true;
}
