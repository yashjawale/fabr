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
 * Execute a command by name
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
 * Get list of all available commands
 */
export function getAvailableCommands(): CommandDefinition[] {
    return Object.values(commands);
}
