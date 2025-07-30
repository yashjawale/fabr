#!/usr/bin/env node

import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import ora from 'ora';

// Import modularized functions from the 'lib' directory
import { runCommand } from './lib/commands.js';
import { findAndReplace } from './lib/files.js';
import { processPlaceholders } from './lib/placeholders.js';
import { promptForProjectDetails } from './lib/ui.js';

// Load the list of available templates
import templatesData from './templates.json' with { type: 'json' };
const templates = templatesData.templates;

// Define the structure of a template
interface Template {
    name: string;
    value: string;
    repo: string;
}

/**
 * The main function that drives the CLI tool.
 */
async function main() {
    console.log(chalk.cyan.bold('Welcome to Fabr! 🚀'));

    try {
        // 1. Get project details from user
        const { template, projectName } = await promptForProjectDetails(templates);

        const chosenTemplate = templates.find((t: Template) => t.value === template);
        if (!chosenTemplate) {
            console.error(chalk.red('Invalid template selected.'));
            return;
        }

        // 2. Download the template from GitHub
        await runCommand(`npx degit ${chosenTemplate.repo} ${projectName}`, `Downloading template '${chosenTemplate.name}'...`);

        // Change into the newly created project directory
        process.chdir(projectName);
        const projectPath = process.cwd();

        // 3. Read the template's configuration file
        const configPath = path.join(projectPath, 'starter.config.json');
        let config: any = {};
        if (fs.existsSync(configPath)) {
            config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        } else {
            console.log(chalk.yellow("No 'starter.config.json' found. Skipping advanced setup."));
        }
        
        // STAGE 1: Run pre-setup command
        await runCommand(config.preSetupCommand, 'Running pre-setup tasks...');

        // STAGE 2: Process all placeholders
        const placeholderValues = await processPlaceholders(config.placeholders);
        
        if (Object.keys(placeholderValues).length > 0) {
            const replaceSpinner = ora('Replacing placeholders in files...').start();
            findAndReplace(projectPath, placeholderValues);
            replaceSpinner.succeed(chalk.green('Placeholders replaced successfully!'));
        }
        
        if (fs.existsSync(configPath)) {
            fs.unlinkSync(configPath);
        }

        // STAGE 3: Run post-setup command
        await runCommand(config.postSetupCommand, 'Running post-setup tasks...');

        // STAGE 4: Install dependencies
        await runCommand(config.installCommand, 'Installing dependencies...');

        // STAGE 5: Run post-install command
        await runCommand(config.postInstallCommand, 'Running post-install tasks...');

        // Final success message
        console.log(chalk.green.bold('\n✨ Your project is ready! ✨\n'));
        console.log(chalk.white(`To get started, navigate to your new project:`));
        console.log(chalk.cyan(`   cd ${projectName}`));
        console.log(chalk.white('\nHappy coding!'));

    } catch (error: any) {
        if (error.isTtyError) {
            console.log(chalk.yellow('\n\nProject creation cancelled.'));
        } else {
			console.log('\n\nProject creation failed due to an error.');
		}
    }
}

main();
