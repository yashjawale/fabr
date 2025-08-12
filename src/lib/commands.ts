/**
 * Command template processing utilities
 */

import chalk from 'chalk';
import * as path from 'path';
import { execa } from 'execa';
import { runShellCommand } from './shell.js';
import { CommandTemplate } from '../types/fabr-config.js';

/**
 * Execute a command with output visible to the user.
 * Uses execa with inherit stdio to show command output directly in the terminal.
 * Enables shell features like redirection and piping.
 * 
 * @param {string} command - The command to execute
 * 
 * @returns {Promise<void>} A promise that resolves when the command completes
 * 
 * @throws {Error} Throws an error if the command execution fails
 */
async function executeCommandWithOutput(command: string): Promise<void> {
    // Use shell: true for commands that need shell features like redirection
    await execa(command, { stdio: 'inherit', shell: true });
}

/**
 * Execute a list of command templates with placeholder replacement.
 * Processes each command template by replacing placeholders with their values,
 * executing commands in their specified working directories, and providing
 * progress feedback. Supports both visible output and silent execution modes.
 * 
 * @param {CommandTemplate[]} commands - Array of command templates to execute
 * @param {Record<string, string>} placeholderValues - Mapping of placeholder keys to their values
 * @param {string} projectPath - The base project path for relative working directories
 * 
 * @returns {Promise<void>} A promise that resolves when all commands complete successfully
 * 
 * @throws {Error} Throws an error if any command execution fails
 */
export async function executeCommandTemplates(
    commands: CommandTemplate[],
    placeholderValues: Record<string, string>,
    projectPath: string
): Promise<void> {
    console.log(chalk.cyan.bold('\n📋 Executing template commands...\n'));

    for (let i = 0; i < commands.length; i++) {
        const cmd = commands[i];
        const commandNumber = i + 1;
        
        // Replace placeholders in the command
        const processedCommand = replacePlaceholdersInCommand(cmd.command, placeholderValues);
        
        // Determine working directory
        const workingDir = cmd.workingDirectory 
            ? path.resolve(projectPath, cmd.workingDirectory)
            : projectPath;
        
        // Show command description or command itself
        const description = cmd.description || `Running command ${commandNumber}`;
        const showOutput = cmd.showOutput !== false; // Default to true
        
        console.log(chalk.gray(`[${commandNumber}/${commands.length}] ${description}`));
        if (showOutput) {
            console.log(chalk.dim(`   $ ${processedCommand}`));
        }
        
        try {
            // Change to working directory, run command, then change back
            const originalCwd = process.cwd();
            process.chdir(workingDir);
            
            if (showOutput) {
                // Execute command with output visible
                await executeCommandWithOutput(processedCommand);
            } else {
                // Execute command with spinner (no output)
                await runShellCommand(processedCommand, `Executing: ${description}`);
            }
            
            process.chdir(originalCwd);
            
            console.log(chalk.green(`   ✓ Completed\n`));
        } catch (error) {
            console.error(chalk.red(`   ✗ Failed: ${error}`));
            throw error;
        }
    }
    
    console.log(chalk.green.bold('✅ All commands executed successfully!\n'));
}

/**
 * Replace placeholders in a command string with their corresponding values.
 * Searches for placeholder patterns in the format {{PLACEHOLDER_NAME}} and replaces
 * them with the provided values. Uses global replacement to handle multiple
 * occurrences of the same placeholder within a command.
 * 
 * @param {string} command - The command string containing placeholder patterns
 * @param {Record<string, string>} placeholderValues - Mapping of placeholder keys to their replacement values
 * 
 * @returns {string} The processed command string with all placeholders replaced
 */
export function replacePlaceholdersInCommand(
    command: string,
    placeholderValues: Record<string, string>
): string {
    let processedCommand = command;
    
    // Replace all placeholder patterns like {{PLACEHOLDER_NAME}}
    for (const [key, value] of Object.entries(placeholderValues)) {
        const placeholder = `{{${key}}}`;
        processedCommand = processedCommand.replace(new RegExp(placeholder, 'g'), value);
    }
    
    return processedCommand;
}

/**
 * Validate that all placeholders in commands have corresponding values.
 * Scans all command templates for placeholder patterns and checks if each
 * placeholder has a corresponding value in the provided placeholder values.
 * Returns a list of missing placeholder keys that need to be resolved.
 * 
 * @param {CommandTemplate[]} commands - Array of command templates to validate
 * @param {Record<string, string>} placeholderValues - Available placeholder values
 * 
 * @returns {string[]} Array of placeholder keys that are missing values
 */
export function validateCommandPlaceholders(
    commands: CommandTemplate[],
    placeholderValues: Record<string, string>
): string[] {
    const missingPlaceholders: string[] = [];
    const placeholderPattern = /\{\{([A-Z_]+)\}\}/g;
    
    for (const cmd of commands) {
        let match;
        while ((match = placeholderPattern.exec(cmd.command)) !== null) {
            const placeholderKey = match[1];
            if (!placeholderValues[placeholderKey]) {
                if (!missingPlaceholders.includes(placeholderKey)) {
                    missingPlaceholders.push(placeholderKey);
                }
            }
        }
    }
    
    return missingPlaceholders;
}
