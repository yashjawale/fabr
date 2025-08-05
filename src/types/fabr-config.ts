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

export interface EnvironmentVariable {
    /** The environment variable name (e.g., 'DATABASE_URL', 'API_KEY') */
    key: string;
    /** The message to show when prompting for this value */
    prompt?: string;
    /** Additional description or help text for this environment variable */
    description?: string;
    /** Default value for this environment variable */
    default?: string;
    /** Whether this environment variable is required */
    required?: boolean;
    /** Whether this should be saved to .env.local instead of .env (for sensitive values) */
    local?: boolean;
    /** Transform this environment variable's value from a placeholder */
    transform?: PlaceholderTransform;
    /** Generate a default value by transforming a placeholder */
    defaultCase?: PlaceholderDefaultCase;
    /** Validation rules for this environment variable */
    validate?: PlaceholderValidation;
}

export interface FileConfiguration {
    /** Array of file patterns to ignore during placeholder replacement */
    ignore?: string[];
    /** Array of file patterns to specifically include for placeholder replacement */
    include?: string[];
}

export interface CommandTemplate {
    /** The command to execute */
    command: string;
    /** Description of what this command does */
    description?: string;
    /** Working directory for this command (relative to project root) */
    workingDirectory?: string;
    /** Whether to show command output (default: true) */
    showOutput?: boolean;
}

export interface FabrConfig {
    /** The name of the template configuration */
    name?: string;
    /** A brief description of what this template creates */
    description?: string;
    /** Version of the template configuration */
    version?: string;
    /** Template type: 'files' (default) or 'commands' */
    type?: 'files' | 'commands';
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
    /** Array of environment variable configurations */
    environmentVariables?: EnvironmentVariable[];
    /** File-specific configurations */
    files?: FileConfiguration;
    /** Whether to initialize a git repository after setup */
    gitInit?: boolean;
    /** Array of file patterns to remove after setup completion */
    removeFiles?: string[];
    /** Array of commands to run for command-based templates */
    commands?: CommandTemplate[];
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
 * Type guard to check if an environment variable is a prompted environment variable
 */
export function isPromptedEnvironmentVariable(envVar: EnvironmentVariable): boolean {
    return !!envVar.prompt && !envVar.transform;
}

/**
 * Type guard to check if an environment variable is a transformed environment variable
 */
export function isTransformedEnvironmentVariable(envVar: EnvironmentVariable): boolean {
    return !!envVar.transform;
}

/**
 * Type guard to check if a config is a command-based template
 */
export function isCommandBasedTemplate(config: FabrConfig): boolean {
    return config.type === 'commands' || (!!config.commands && config.commands.length > 0);
}

/**
 * Type guard to check if a config is a file-based template
 */
export function isFileBasedTemplate(config: FabrConfig): boolean {
    return !isCommandBasedTemplate(config);
}

/**
 * Validates a fabr config object against the expected structure
 */
export function validateFabrConfig(config: any): config is FabrConfig {
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
