import ora from 'ora';
import { execa } from 'execa';
import chalk from 'chalk';

/**
 * Executes a shell command with a spinner for user feedback.
 * @param command - The command to execute.
 * @param spinnerText - The text to display while the command is running.
 */
export const runCommand = async (command: string | undefined, spinnerText: string): Promise<void> => {
    if (!command) return;

    const spinner = ora(spinnerText).start();
    try {
        const commands = command.split(' && ');
        for (const cmd of commands) {
            const [file, ...args] = cmd.trim().split(' ');
            await execa(file, args);
        }
        spinner.succeed(chalk.green('Done!'));
    } catch (error: any) {
        spinner.fail(chalk.red('An error occurred.'));
        console.error(error.stderr || error.message);
        throw error;
    }
};
