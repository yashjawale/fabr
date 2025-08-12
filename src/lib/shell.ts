import ora from 'ora';
import { execa } from 'execa';
import chalk from 'chalk';

/**
 * Executes a shell command with a spinner for user feedback.
 * Supports chaining commands with && operator and provides visual feedback.
 * Shows a spinner during execution and success/error messages when complete.
 * 
 * @param {string | undefined} command - The shell command to execute (can include && for chaining). If undefined, the function returns immediately.
 * @param {string} spinnerText - The text to display while the command is running
 * 
 * @returns {Promise<void>} A promise that resolves when the command completes successfully, or rejects on error
 * 
 * @throws {Error} Throws an error if the command execution fails
 */
export const runShellCommand = async (command: string | undefined, spinnerText: string): Promise<void> => {
    if (!command) return;

    const spinner = ora(spinnerText).start();
    try {
        const commands = command.split(' && ');
        for (const cmd of commands) {
            const [file, ...args] = cmd.trim().split(' ');
            await execa(file, args);
        }
        spinner.succeed(chalk.green('Done!'));
    } catch (error: unknown) {
        spinner.fail(chalk.red('An error occurred.'));
        const err = error as { stderr?: string; message?: string };
        console.error(err.stderr || err.message);
        throw error;
    }
};
