/**
 * TypeScript interfaces for Fabr configuration
 * Generated from fabr.config.schema.json
 */

export type CaseType = 'kebab' | 'pascal' | 'camel' | 'snake' | 'constant';

export interface PlaceholderValidation {
    /** Regular expression pattern that the value must match */
    pattern?: string;
    /** Minimum length of the value */
    minLength?: number;
    /** Maximum length of the value */
    maxLength?: number;
}

export interface PlaceholderTransform {
    /** The source placeholder key to transform from */
    source: string;
    /** The case transformation to apply */
    case: CaseType;
}

export interface PlaceholderDefaultCase {
    /** The source placeholder key to transform from */
    source: string;
    /** The case transformation to apply */
    case: CaseType;
    /** Template string where {value} will be replaced with the transformed value */
    template?: string;
}

export interface Placeholder {
    /** The placeholder key (e.g., 'PROJECT_NAME', 'AUTHOR_NAME') */
    key: string;
    /** The message to show when prompting for this value */
    prompt?: string;
    /** Additional description or help text for this placeholder */
    description?: string;
    /** Default value for this placeholder */
    default?: string;
    /** Whether this placeholder is required */
    required?: boolean;
    /** Transform this placeholder's value from another placeholder */
    transform?: PlaceholderTransform;
    /** Generate a default value by transforming another placeholder */
    defaultCase?: PlaceholderDefaultCase;
    /** Validation rules for this placeholder */
    validate?: PlaceholderValidation;
}

export interface FileConfiguration {
    /** Array of file patterns to ignore during placeholder replacement */
    ignore?: string[];
    /** Array of file patterns to specifically include for placeholder replacement */
    include?: string[];
}

export interface StarterConfig {
    /** The name of the template configuration */
    name?: string;
    /** A brief description of what this template creates */
    description?: string;
    /** Version of the template configuration */
    version?: string;
    /** Command to run before any setup tasks */
    preSetupCommand?: string;
    /** Command to run after placeholder replacement */
    postSetupCommand?: string;
    /** Command to install dependencies */
    installCommand?: string;
    /** Command to run after dependency installation */
    postInstallCommand?: string;
    /** Array of placeholder configurations for template customization */
    placeholders?: Placeholder[];
    /** File-specific configurations */
    files?: FileConfiguration;
    /** Whether to initialize a git repository after setup */
    gitInit?: boolean;
    /** Array of file patterns to remove after setup completion */
    removeFiles?: string[];
}

/**
 * Type guard to check if a placeholder is a prompted placeholder
 */
export function isPromptedPlaceholder(placeholder: Placeholder): boolean {
    return !!placeholder.prompt && !placeholder.transform;
}

/**
 * Type guard to check if a placeholder is a transformed placeholder
 */
export function isTransformedPlaceholder(placeholder: Placeholder): boolean {
    return !!placeholder.transform;
}

/**
 * Validates a starter config object against the expected structure
 */
export function validateStarterConfig(config: any): config is StarterConfig {
    // Basic validation - you might want to add more comprehensive validation
    if (typeof config !== 'object' || config === null) {
        return false;
    }
    
    // Validate placeholders if they exist
    if (config.placeholders && Array.isArray(config.placeholders)) {
        for (const placeholder of config.placeholders) {
            if (!placeholder.key || typeof placeholder.key !== 'string') {
                return false;
            }
            
            // Must have either prompt or transform
            if (!placeholder.prompt && !placeholder.transform) {
                return false;
            }
        }
    }
    
    return true;
}
