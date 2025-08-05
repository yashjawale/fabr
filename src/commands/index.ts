import { Template } from '../types/templates.js';
import { parseGlobalArgs } from '../lib/args.js';
import { initCommandHandler } from './init.js';
import { helpCommandHandler, showGlobalHelp } from './help.js';
import { listCommandHandler } from './list.js';
import chalk from 'chalk';

export interface CommandDefinition {
    name: string;
    description: string;
    handler: (templates: Template[], args: string[]) => Promise<void>;
}

/**
 * Registry of all available commands
 */
export const commands: Record<string, CommandDefinition> = {
    init: {
        name: 'init',
        description: 'Create a new project from a template',
        handler: async (templates: Template[], args: string[]) => {
            await initCommandHandler(templates, args);
        }
    },
    list: {
        name: 'list',
        description: 'List all available templates',
        handler: async (templates: Template[], args: string[]) => {
            await listCommandHandler(templates, args);
        }
    },
    help: {
        name: 'help',
        description: 'Show this help message',
        handler: async (templates: Template[], args: string[]) => {
            await helpCommandHandler(templates, args);
        }
    }
};

/**
 * Execute a command by name
 */
export async function executeCommand(
    commandName: string | undefined,
    templates: Template[],
    args: string[]
): Promise<void> {
    // Parse global arguments for better handling
    const globalArgs = parseGlobalArgs(args);

    // Use first positional argument as command if commandName is not provided
    const command = commandName || (args.length > 0 ? args[0] : undefined);

    // Handle global help flags (when no specific command or help command)
    if (globalArgs.help && (!command || command === 'help')) {
        showGlobalHelp();
        process.exit(0);
    }

    // Handle no command specified
    if (!command) {
        console.log(chalk.yellow('No command specified. Use "npx fabr init" to create a new project.'));
        console.log(chalk.gray('Run "npx fabr help" for more information.'));
        process.exit(0);
    }

    // Find and execute the command
    const commandDef = commands[command];
    if (!commandDef) {
        console.log(chalk.red(`Unknown command: ${command}`));
        console.log(chalk.gray('Run "npx fabr help" for available commands.'));
        process.exit(1);
    }

    // Execute the command (command-specific help is handled within each command)
    await commandDef.handler(templates, args);
}

/**
 * Get list of all available commands
 */
export function getAvailableCommands(): CommandDefinition[] {
    return Object.values(commands);
}
