/**
 * Command template processing utilities
 */

import chalk from 'chalk';
import * as path from 'path';
import { execa } from 'execa';
import { runShellCommand } from './shell.js';
import { CommandTemplate } from '../types/fabr-config.js';

/**
 * Execute a command with output visible to the user
 */
async function executeCommandWithOutput(command: string): Promise<void> {
    // Use shell: true for commands that need shell features like redirection
    await execa(command, { stdio: 'inherit', shell: true });
}

/**
 * Execute a list of command templates with placeholder replacement
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
 * Replace placeholders in a command string
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
 * Validate that all placeholders in commands have values
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
