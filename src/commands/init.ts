import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import ora from 'ora';

// Import modularized functions from the 'lib' directory
import { runShellCommand } from '../lib/shell.js';
import { findAndReplace } from '../lib/files.js';
import { processPlaceholders } from '../lib/placeholders.js';
import { promptForProjectDetails } from '../lib/ui.js';

// Import types
import { FabrConfig, validateFabrConfig } from '../types/fabr-config.js';
import { Template, findTemplateBySlug } from '../types/templates.js';

/**
 * Parse init command arguments
 */
function parseInitArgs(args: string[]): { projectName?: string; templateSlug?: string } {
    // Remove 'init' from args if it's the first argument
    const cleanArgs = args[0] === 'init' ? args.slice(1) : args;
    
    let projectName: string | undefined;
    let templateSlug: string | undefined;

    for (let i = 0; i < cleanArgs.length; i++) {
        const arg = cleanArgs[i];
        
        if (arg.startsWith('--template=')) {
            templateSlug = arg.split('=')[1];
        } else if (!arg.startsWith('-') && !projectName) {
            // First non-flag argument is the project name
            projectName = arg;
        }
    }

    return { projectName, templateSlug };
}

/**
 * Initialize a new project from a template
 */
export async function initCommand(templates: Template[], args: string[] = []): Promise<void> {
    console.log(chalk.cyan.bold('Welcome to Fabr! 🚀'));

    try {
        // Parse command line arguments
        const { projectName: providedProjectName, templateSlug: providedTemplate } = parseInitArgs(args);

        // Validate provided project name
        if (providedProjectName && !/^([A-Za-z\-\_\d])+$/.test(providedProjectName)) {
            console.error(chalk.red('Project name may only include letters, numbers, underscores and hashes.'));
            process.exit(1);
        }

        // 1. Get project details from user (skip prompts if already provided)
        const { template, projectName } = await promptForProjectDetails(
            templates, 
            providedProjectName, 
            providedTemplate
        );

        const chosenTemplate = findTemplateBySlug(templates, template);
        if (!chosenTemplate) {
            if (providedTemplate) {
                console.error(chalk.red(`Template '${providedTemplate}' not found.`));
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
