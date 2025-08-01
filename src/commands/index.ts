import { Template } from '../types/templates.js';
import { initCommand } from './init.js';
import { helpCommand, showHelp } from './help.js';
import { listCommand } from './list.js';

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
            await initCommand(templates);
        }
    },
    list: {
        name: 'list',
        description: 'List all available templates',
        handler: async (templates: Template[], args: string[]) => {
            await listCommand(templates);
        }
    },
    help: {
        name: 'help',
        description: 'Show this help message',
        handler: async (templates: Template[], args: string[]) => {
            await helpCommand();
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
    // Handle help flags first
    if (args.includes('--help') || args.includes('-h')) {
        showHelp();
        process.exit(0);
    }

    // Handle no command specified
    if (!commandName) {
        console.log('\x1b[33mNo command specified. Use "npx fabr init" to create a new project.\x1b[0m');
        console.log('\x1b[90mRun "npx fabr help" for more information.\x1b[0m');
        process.exit(0);
    }

    // Find and execute the command
    const command = commands[commandName];
    if (!command) {
        console.log(`\x1b[31mUnknown command: ${commandName}\x1b[0m`);
        console.log('\x1b[90mRun "npx fabr help" for available commands.\x1b[0m');
        process.exit(1);
    }

    await command.handler(templates, args);
}

/**
 * Get list of all available commands
 */
export function getAvailableCommands(): CommandDefinition[] {
    return Object.values(commands);
}
