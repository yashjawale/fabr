import chalk from 'chalk';
import { input } from '@inquirer/prompts';
import * as fs from 'fs';
import * as path from 'path';
import { EnvironmentVariable, CaseType, isPromptedEnvironmentVariable, isTransformedEnvironmentVariable } from '../types/fabr-config.js';

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
    const words = inputStr.split(/[\s_-]+/).filter(Boolean);
    switch (format) {
        case 'kebab': return words.map(w => w.toLowerCase()).join('-');
        case 'pascal': return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
        case 'camel': return words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
        case 'snake': return words.map(w => w.toLowerCase()).join('_');
        case 'constant': return words.map(w => w.toUpperCase()).join('_');
        default: return inputStr;
    }
};

/**
 * Processes environment variable configurations to get final values.
 * Handles both prompted environment variables (requiring user input) and transformed
 * environment variables (derived from placeholder values). Separates variables into
 * regular (.env) and local (.env.local) categories based on their configuration.
 * 
 * @param {EnvironmentVariable[] | undefined} envVarConfig - The array of environment variable configuration objects
 * @param {Record<string, string>} placeholderValues - Existing placeholder values for transformations
 * 
 * @returns {Promise<{ regular: Record<string, string>; local: Record<string, string> }>} Object containing regular and local environment variables
 */
export const processEnvironmentVariables = async (
    envVarConfig: EnvironmentVariable[] | undefined,
    placeholderValues: Record<string, string>
): Promise<{ regular: Record<string, string>; local: Record<string, string> }> => {
    const regularEnvVars: Record<string, string> = {};
    const localEnvVars: Record<string, string> = {};
    
    if (!envVarConfig || envVarConfig.length === 0) {
        return { regular: regularEnvVars, local: localEnvVars };
    }

    console.log(chalk.cyan('\nPlease provide values for the following environment variables:'));

    const promptedEnvVars = envVarConfig.filter(isPromptedEnvironmentVariable);
    const derivedEnvVars = envVarConfig.filter(isTransformedEnvironmentVariable);

    // Process prompted environment variables
    for (const envVar of promptedEnvVars) {
        let defaultValue: string | undefined = envVar.default;

        // Check if we need to compute a default from a placeholder
        if (envVar.defaultCase) {
            const sourceValue = placeholderValues[envVar.defaultCase.source];
            if (sourceValue) {
                const transformed = transformCase(sourceValue, envVar.defaultCase.case);
                defaultValue = envVar.defaultCase.template
                    ? envVar.defaultCase.template.replace('{value}', transformed)
                    : transformed;
            }
        }

        const answer = await input({
            message: envVar.prompt || `Enter value for ${envVar.key}:`,
            default: defaultValue,
            validate: (inputValue: string) => {
                if (envVar.required && !inputValue.trim()) {
                    return 'This environment variable is required';
                }

                // Apply validation rules if they exist
                if (envVar.validate && inputValue.trim()) {
                    if (envVar.validate.pattern) {
                        const regex = new RegExp(envVar.validate.pattern);
                        if (!regex.test(inputValue)) {
                            return `Value must match pattern: ${envVar.validate.pattern}`;
                        }
                    }
                    
                    if (envVar.validate.minLength && inputValue.length < envVar.validate.minLength) {
                        return `Value must be at least ${envVar.validate.minLength} characters long`;
                    }
                    
                    if (envVar.validate.maxLength && inputValue.length > envVar.validate.maxLength) {
                        return `Value must be no more than ${envVar.validate.maxLength} characters long`;
                    }
                }
                
                return true;
            }
        });
        
        // Store in the appropriate object based on local flag
        if (envVar.local) {
            localEnvVars[envVar.key] = answer;
        } else {
            regularEnvVars[envVar.key] = answer;
        }
    }

    // Process derived environment variables
    derivedEnvVars.forEach(envVar => {
        if (envVar.transform) {
            const sourceValue = placeholderValues[envVar.transform.source];
            if (sourceValue) {
                const transformedValue = transformCase(sourceValue, envVar.transform.case);
                
                // Store in the appropriate object based on local flag
                if (envVar.local) {
                    localEnvVars[envVar.key] = transformedValue;
                } else {
                    regularEnvVars[envVar.key] = transformedValue;
                }
            } else {
                console.warn(chalk.yellow(`Warning: Source placeholder '${envVar.transform.source}' for environment variable '${envVar.key}' not found.`));
            }
        }
    });

    return { regular: regularEnvVars, local: localEnvVars };
};

/**
 * Creates .env and .env.local files with the provided environment variables.
 * Writes environment variables to appropriate files based on their categorization.
 * Regular variables go to .env, sensitive/local variables go to .env.local.
 * Only creates files if there are variables to write.
 * 
 * @param {string} projectPath - The path to the project directory where files will be created
 * @param {Record<string, string>} regularEnvVars - Environment variables for .env file
 * @param {Record<string, string>} localEnvVars - Environment variables for .env.local file
 * 
 * @returns {void}
 */
export const createEnvironmentFiles = (
    projectPath: string,
    regularEnvVars: Record<string, string>,
    localEnvVars: Record<string, string>
): void => {
    // Create .env file if there are regular environment variables
    if (Object.keys(regularEnvVars).length > 0) {
        const envContent = Object.entries(regularEnvVars)
            .map(([key, value]) => `${key}=${value}`)
            .join('\n') + '\n';
        
        const envPath = path.join(projectPath, '.env');
        fs.writeFileSync(envPath, envContent, 'utf8');
        console.log(chalk.green(`✓ Created .env file with ${Object.keys(regularEnvVars).length} variables`));
    }

    // Create .env.local file if there are local environment variables
    if (Object.keys(localEnvVars).length > 0) {
        const envLocalContent = Object.entries(localEnvVars)
            .map(([key, value]) => `${key}=${value}`)
            .join('\n') + '\n';
        
        const envLocalPath = path.join(projectPath, '.env.local');
        fs.writeFileSync(envLocalPath, envLocalContent, 'utf8');
        console.log(chalk.green(`✓ Created .env.local file with ${Object.keys(localEnvVars).length} variables`));
    }
};

/**
 * Processes environment variables and creates the appropriate .env files.
 * Combines the processing of environment variable configurations with file creation.
 * This is a convenience function that handles the complete environment variable workflow.
 * 
 * @param {EnvironmentVariable[] | undefined} envVarConfig - The array of environment variable configurations
 * @param {Record<string, string>} placeholderValues - Existing placeholder values for transformations
 * @param {string} projectPath - The path to the project directory where .env files will be created
 * 
 * @returns {Promise<void>} A promise that resolves when environment files are created
 */
export const processAndCreateEnvironmentFiles = async (
    envVarConfig: EnvironmentVariable[] | undefined,
    placeholderValues: Record<string, string>,
    projectPath: string
): Promise<void> => {
    const { regular, local } = await processEnvironmentVariables(envVarConfig, placeholderValues);
    createEnvironmentFiles(projectPath, regular, local);
};
