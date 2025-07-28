#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { execa } from 'execa';

import data from './templates.json' with { type: 'json' };

const templates = data.templates;

// --- Main Function ---
async function main() {
    console.log(chalk.cyan.bold('Welcome Fabr!'));

    try {
        // 1. Ask the user to choose a template and name the project
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'template',
                message: 'Which project template would you like to use?',
                choices: templates.map(t => ({ name: t.name, value: t.value })),
            },
            {
                type: 'input',
                name: 'projectName',
                message: 'What is the name of your new project?',
                validate: function (input) {
                    // Basic validation to ensure the project name isn't empty
                    if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
                    else return 'Project name may only include letters, numbers, underscores and hashes.';
                },
            },
        ]);

        const { template, projectName } = answers;
        const chosenTemplate = templates.find(t => t.value === template);

        if (!chosenTemplate) {
            console.error(chalk.red('Invalid template selected.'));
            return;
        }

        // 2. Download the template from GitHub
        const downloadSpinner = ora(`Downloading template from ${chosenTemplate.repo}...`).start();

        try {
            await execa('npx', ['degit', chosenTemplate.repo, projectName]);
            downloadSpinner.succeed(chalk.green(`Template downloaded successfully into ./${projectName}`));
        } catch (error) {
            downloadSpinner.fail(chalk.red('Failed to download the template.'));
            console.error(error.stderr || error.message);
            return;
        }

        // 3. Change into the new project directory
        process.chdir(projectName);

        // 4. Run the installation command for the template (e.g., 'npm install')
        const installSpinner = ora(`Installing dependencies with '${chosenTemplate.installCommand}'...`).start();
        try {
            // We split the command in case there are multiple, like 'composer install && npm install'
            const commands = chosenTemplate.installCommand.split(' && ');
            for (const command of commands) {
                const [cmd, ...args] = command.split(' ');
                await execa(cmd, args);
            }
            installSpinner.succeed(chalk.green('Dependencies installed successfully!'));
        } catch (error) {
            installSpinner.fail(chalk.red('Failed to install dependencies.'));
            console.error(error.stderr || error.message);
            console.log(chalk.yellow('You may need to install them manually.'));
        }

        // 5. Final success message
        console.log(chalk.green.bold('\n✨ Your project is ready! ✨\n'));
        console.log(chalk.white(`To get started, run the following commands:`));
        console.log(chalk.cyan(`   cd ${projectName}`));
        console.log(chalk.cyan(`   npm start`));
        console.log(chalk.white('\nHappy coding!'));

    } catch (error) {
        // Handle cases where the user cancels the prompt (e.g., Ctrl+C)
        if (error.isTtyError) {
            console.log(chalk.yellow('\n\nProject creation cancelled.'));
        } else {
            console.error(chalk.red('\nAn unexpected error occurred:'));
            console.error(error);
        }
    }
}

// Run the main function
main();
