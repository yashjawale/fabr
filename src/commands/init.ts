import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import ora from 'ora';

// Import modularized functions from the 'lib' directory
import { runShellCommand } from '../lib/shell.js';
import { findAndReplace } from '../lib/files.js';
import { processPlaceholders } from '../lib/placeholders.js';
import { promptForProjectDetails } from '../lib/ui.js';
import { parseSubcommandOnlyArgs, parseSubcommandArgs, validateProjectName } from '../lib/args.js';

// Import types
import { FabrConfig, validateFabrConfig } from '../types/fabr-config.js';
import { Template, findTemplateBySlug } from '../types/templates.js';
import { BaseSubcommand, SubcommandArgs } from '../types/subcommand.js';
import { HelpContent } from '../lib/help.js';

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

    async execute(templates: Template[], args: InitArgs): Promise<void> {
        try {
            // Validate provided project name if given
            if (args.projectName) {
                const validation = validateProjectName(args.projectName);
                if (!validation.valid) {
                    console.error(chalk.red(validation.error));
                    process.exit(1);
                }
            }

            console.log(chalk.cyan.bold('Welcome to Fabr! 🚀'));

            // Get project details from user (skip prompts if already provided)
            const { template, projectName } = await promptForProjectDetails(
                templates, 
                args.projectName, 
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
            await runShellCommand(`npx degit ${chosenTemplate.repo} ${projectName}`, `Downloading template '${chosenTemplate.name}'...`);

            // Change into the newly created project directory
            process.chdir(projectName);
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
                } catch (error) {
                    console.log(chalk.yellow("Failed to parse 'fabr.config.json'. Skipping advanced setup."));
                }
            } else {
                console.log(chalk.yellow("No 'fabr.config.json' found. Skipping advanced setup."));
            }
            
            // STAGE 1: Run pre-setup command
            await runShellCommand(config.preSetupCommand, 'Running pre-setup tasks...');

            // STAGE 2: Process all placeholders
            const placeholderValues = await processPlaceholders(config.placeholders);
            
            if (Object.keys(placeholderValues).length > 0) {
                const replaceSpinner = ora('Replacing placeholders in files...').start();
                findAndReplace(projectPath, placeholderValues);
                replaceSpinner.succeed(chalk.green('Placeholders replaced successfully!'));
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
            console.log(chalk.cyan(`   cd ${projectName}`));
            console.log(chalk.white('\nHappy coding!'));

        } catch (error: any) {
            if (error.isTtyError) {
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
