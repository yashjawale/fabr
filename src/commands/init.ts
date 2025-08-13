import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import ora from 'ora';
import { confirm } from '@inquirer/prompts';

// Import modularized functions from the 'lib' directory
import { runShellCommand } from '../lib/shell.js';
import { findAndReplace } from '../lib/files.js';
import { processPlaceholders } from '../lib/placeholders.js';
import { processAndCreateEnvironmentFiles } from '../lib/env.js';
import { promptForProjectDetails } from '../lib/ui.js';
import { parseSubcommandOnlyArgs, parseSubcommandArgs, validateProjectName } from '../lib/args.js';

// Import types
import { FabrConfig, validateFabrConfig, isCommandBasedTemplate } from '../types/fabr-config.js';
import { Template, findTemplateBySlug } from '../types/templates.js';
import { BaseSubcommand, SubcommandArgs } from '../types/subcommand.js';
import { HelpContent } from '../lib/help.js';
import { executeCommandTemplates, validateCommandPlaceholders } from '../lib/commands.js';

export interface InitArgs extends SubcommandArgs {
    projectName?: string;
    templateSlug?: string;
}

/**
 * Create a new project from a template
 */
export class InitCommand extends BaseSubcommand<InitArgs> {
    readonly name = 'init';
    readonly description = 'Create a new project from a template';
    
    /**
     * Get help content configuration for the init command.
     * Returns usage instructions, description, arguments, options, and examples for the init command.
     * 
     * @returns {HelpContent} Help content object with usage, description, arguments, options, and examples
	 * 
     * @protected
     */
    protected getHelpContent(): HelpContent {
        return {
            usage: 'npx fabr init [project-name] [options]',
            description: this.description,
            arguments: [
                { name: 'project-name', description: 'Name of the project directory to create' }
            ],
            options: [
                { flag: '--template=<slug>', description: 'Template slug to use (skips template selection)' },
                { flag: '-t <slug>', description: 'Short form of --template' },
                { flag: '--help, -h', description: 'Show this help message' }
            ],
            examples: [
                { command: 'npx fabr init', description: 'Interactive mode' },
                { command: 'npx fabr init my-project', description: 'Specify project name' },
                { command: 'npx fabr init my-project --template=slug', description: 'Specify both (long form)' },
                { command: 'npx fabr init my-project -t slug', description: 'Specify both (short form)' },
                { command: 'npx fabr init --help', description: 'Show this help' }
            ]
        };
    }

    /**
     * Parse command line arguments for the init command.
     * Extracts project name, template slug, and help flag from the provided arguments.
     * 
     * @param {string[]} rawArgs - Raw command line arguments
	 * 
     * @returns {InitArgs} Parsed init command arguments including project name and template slug
     */
    parseArgs(rawArgs: string[]): InitArgs {
        const cleanArgs = parseSubcommandArgs(rawArgs, this.name);
        const parsed = parseSubcommandOnlyArgs(cleanArgs);
        
        return {
            projectName: parsed.positional[0] || undefined,
            templateSlug: typeof parsed.flags.template === 'string' ? parsed.flags.template : 
                         typeof parsed.flags.t === 'string' ? parsed.flags.t : undefined,
            help: parsed.help
        };
    }

    /**
     * Execute the init command to create a new project from a template.
     * 
     * This method orchestrates the entire project creation process:
     * 1. Validates the project name
     * 2. Prompts for missing information (project name, template)
     * 3. Downloads the template from GitHub
     * 4. Processes the template configuration
     * 5. Handles placeholders and environment variables
     * 6. Runs setup commands
     * 7. Installs dependencies and runs post-install tasks
     * 8. Cleans up temporary files
     * 
     * @param {Template[]} templates - Array of available templates
     * @param {InitArgs} args - Parsed command arguments
	 * 
     * @returns {Promise<void>} A promise that resolves when project creation is complete
     */
    async execute(templates: Template[], args: InitArgs): Promise<void> {
        try {
            let projectName = args.projectName;
            
            // Validate provided project name if given
            if (projectName) {
                const validation = validateProjectName(projectName);
                if (!validation.valid) {
                    console.error(chalk.red(validation.error));
                    
                    // If we have a suggestion, offer it to the user
                    if (validation.suggestion) {
                        const useSuggestion = await confirm({
                            message: `Would you like to use "${chalk.cyan(validation.suggestion)}" instead?`,
                            default: true
                        });
                        
                        if (useSuggestion) {
                            projectName = validation.suggestion;
                            console.log(chalk.green(`✓ Using project name: ${projectName}`));
                        } else {
                            console.log(chalk.gray('Please choose a different project name.'));
                            process.exit(1);
                        }
                    } else {
                        process.exit(1);
                    }
                }
            }

            console.log(chalk.cyan.bold('Welcome to Fabr! 🚀'));

            // Get project details from user (skip prompts if already provided)
            const { template, projectName: finalProjectName } = await promptForProjectDetails(
                templates, 
                projectName, 
                args.templateSlug
            );

            const chosenTemplate = findTemplateBySlug(templates, template);
            if (!chosenTemplate) {
                if (args.templateSlug) {
                    console.error(chalk.red(`Template '${args.templateSlug}' not found.`));
                    console.log(chalk.gray('Run "npx fabr list" to see available templates.'));
                } else {
                    console.error(chalk.red('Invalid template selected.'));
                }
                process.exit(1);
            }

            // 2. Download the template from GitHub
            await runShellCommand(`npx degit ${chosenTemplate.repo} ${finalProjectName}`, `Downloading template '${chosenTemplate.name}'...`);

            // Change into the newly created project directory
            process.chdir(finalProjectName);
            const projectPath = process.cwd();

            // 3. Read the template's configuration file
            const configPath = path.join(projectPath, 'fabr.config.json');
            let config: FabrConfig = {};
            if (fs.existsSync(configPath)) {
                try {
                    const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
                    if (validateFabrConfig(configData)) {
                        config = configData;
                    } else {
                        console.log(chalk.yellow("Invalid 'fabr.config.json' format. Skipping advanced setup."));
                    }
                } catch {
                    console.log(chalk.yellow("Failed to parse 'fabr.config.json'. Skipping advanced setup."));
                }
            } else {
                console.log(chalk.yellow("No 'fabr.config.json' found. Skipping advanced setup."));
            }
            
            // STAGE 1: Run pre-setup command
            await runShellCommand(config.preSetupCommand, 'Running pre-setup tasks...');

            // STAGE 2: Process all placeholders
            const placeholderValues = await processPlaceholders(config.placeholders);
            
            // STAGE 2.5: Process environment variables and create .env files
            await processAndCreateEnvironmentFiles(config.environmentVariables, placeholderValues, projectPath);
            
            // Check if this is a command-based template
            if (isCommandBasedTemplate(config)) {
                console.log(chalk.cyan.bold('\n🔧 Processing command-based template...\n'));
                
                // Validate that all command placeholders have values
                if (config.commands) {
                    const missingPlaceholders = validateCommandPlaceholders(config.commands, placeholderValues);
                    if (missingPlaceholders.length > 0) {
                        console.error(chalk.red(`Missing values for placeholders: ${missingPlaceholders.join(', ')}`));
                        process.exit(1);
                    }
                    
                    // Execute all command templates
                    await executeCommandTemplates(config.commands, placeholderValues, projectPath);
                } else {
                    console.log(chalk.yellow('Command-based template specified but no commands found.'));
                }
            } else {
                // File-based template processing (existing logic)
                if (Object.keys(placeholderValues).length > 0) {
                    const replaceSpinner = ora('Replacing placeholders in files...').start();
                    findAndReplace(projectPath, placeholderValues);
                    replaceSpinner.succeed(chalk.green('Placeholders replaced successfully!'));
                }
            }

            // STAGE 3: Run post-setup command
            await runShellCommand(config.postSetupCommand, 'Running post-setup tasks...');

            // STAGE 4: Install dependencies
            await runShellCommand(config.installCommand, 'Installing dependencies...');

            // STAGE 5: Run post-install command
            await runShellCommand(config.postInstallCommand, 'Running post-install tasks...');

            // STAGE 6: Clean up config file
            if (fs.existsSync(configPath)) {
                fs.unlinkSync(configPath);
                console.log(chalk.gray('Cleaned up fabr.config.json'));
            }

            // Final success message
            console.log(chalk.green.bold('\n✨ Your project is ready! ✨\n'));
            console.log(chalk.white(`To get started, navigate to your new project:`));
            console.log(chalk.cyan(`   cd ${finalProjectName}`));
            console.log(chalk.white('\nHappy coding!'));

        } catch (error: unknown) {
            const err = error as { isTtyError?: boolean };
            if (err.isTtyError) {
                console.log(chalk.yellow('\n\nProject creation cancelled.'));
                process.exit(0); // User cancelled, not an error
            } else {
                console.log('\n\nProject creation failed due to an error.');
                console.error(error);
                process.exit(1); // Actual error occurred
            }
        }
    }
}
