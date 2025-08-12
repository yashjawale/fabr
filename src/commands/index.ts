import { Template } from '../types/templates.js';
import { InitCommand } from './init.js';
import { HelpCommand } from './help.js';
import { ListCommand } from './list.js';
import chalk from 'chalk';
import { BaseSubcommand } from '../types/subcommand.js';

export interface CommandDefinition {
    name: string;
    description: string;
    handler: BaseSubcommand;
}

// Create command instances
const initCommand = new InitCommand();
const listCommand = new ListCommand();
const helpCommand = new HelpCommand();

/**
 * Registry of all available commands
 */
export const commands: Record<string, CommandDefinition> = {
    init: {
        name: 'init',
        description: 'Create a new project from a template',
        handler: initCommand
    },
    list: {
        name: 'list',
        description: 'List all available templates',
        handler: listCommand
    },
    help: {
        name: 'help',
        description: 'Show this help message',
        handler: helpCommand
    }
};

/**
 * Execute a command by name with the provided arguments.
 * Looks up the command in the registry and delegates execution to the appropriate handler.
 * Shows an error message and exits if the command is not found.
 * 
 * @param {string} commandName - The name of the command to execute
 * @param {Template[]} templates - Array of available templates
 * @param {string[]} args - Command line arguments including the command name
 * 
 * @returns {Promise<void>} A promise that resolves when the command execution is complete
 */
export async function executeCommand(
    commandName: string,
    templates: Template[],
    args: string[]
): Promise<void> {
    // Find and execute the command
    const commandDef = commands[commandName];
    if (!commandDef) {
        console.log(chalk.red(`Unknown command: ${commandName}`));
        console.log(chalk.gray('Run "npx fabr help" for available commands.'));
        process.exit(1);
    }

    // Execute the command (command-specific help is handled within each command)
    await commandDef.handler.handle(templates, args);
}

/**
 * Get list of all available commands with their definitions.
 * Returns an array of CommandDefinition objects containing name, description, and handler.
 * 
 * @returns {CommandDefinition[]} Array of all available command definitions
 */
export function getAvailableCommands(): CommandDefinition[] {
    return Object.values(commands);
}
