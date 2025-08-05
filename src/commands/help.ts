import chalk from 'chalk';
import { parseSubcommandOnlyArgs, parseSubcommandArgs } from '../lib/args.js';
import { BaseSubcommand, SubcommandArgs } from '../types/subcommand.js';
import { Template } from '../types/templates.js';
import { HelpContent } from '../lib/help.js';

export interface HelpArgs extends SubcommandArgs {
    // No additional arguments for help command
}

/**
 * Show global help information
 */
export function showGlobalHelp() {
    console.log(chalk.cyan.bold('Fabr - Project Template Generator 🚀\n'));
    console.log(chalk.white('Usage:'));
    console.log(chalk.cyan('  npx fabr <command>') + chalk.gray('  Execute a command\n'));
    console.log(chalk.white('Available Commands:'));
    console.log(chalk.cyan('  init') + chalk.gray('    Create a new project from a template'));
    console.log(chalk.cyan('  list') + chalk.gray('    List all available templates'));
    console.log(chalk.cyan('  help') + chalk.gray('    Show this help message\n'));
    console.log(chalk.white('Global Options:'));
    console.log(chalk.cyan('  --help, -h') + chalk.gray('  Show help for any command\n'));
    console.log(chalk.white('Examples:'));
    console.log(chalk.gray('  npx fabr init                              ') + chalk.dim('# Interactive mode'));
    console.log(chalk.gray('  npx fabr init my-project                   ') + chalk.dim('# Specify project name'));
    console.log(chalk.gray('  npx fabr init my-project --template=slug   ') + chalk.dim('# Specify both'));
    console.log(chalk.gray('  npx fabr list'));
    console.log(chalk.gray('  npx fabr help\n'));
}

export interface HelpArgs extends SubcommandArgs {
    // No additional arguments for help command
}

/**
 * Show help information for the CLI
 */
export class HelpCommand extends BaseSubcommand<HelpArgs> {
    readonly name = 'help';
    readonly description = 'Show this help message';
    
    protected getHelpContent(): HelpContent {
        return {
            usage: 'npx fabr help',
            description: this.description,
            examples: [
                { command: 'npx fabr help', description: 'Show global help' }
            ]
        };
    }

    parseArgs(rawArgs: string[]): HelpArgs {
        const cleanArgs = parseSubcommandArgs(rawArgs, this.name);
        const parsed = parseSubcommandOnlyArgs(cleanArgs);
        
        return {
            help: parsed.help
        };
    }

    showHelp(): void {
        // Help command always shows global help
        showGlobalHelp();
    }

    async execute(templates: Template[], args: HelpArgs): Promise<void> {
        showGlobalHelp();
        process.exit(0);
    }
}

// Create instance and export handler function for compatibility
const helpCommand = new HelpCommand();

export async function helpCommandHandler(templates: Template[], args: string[]): Promise<void> {
    await helpCommand.handle(templates, args);
}
