import chalk from 'chalk';
import { Template } from '../types/templates.js';
import { parseSubcommandOnlyArgs, parseSubcommandArgs } from '../lib/args.js';
import { BaseSubcommand, SubcommandArgs } from '../types/subcommand.js';
import { HelpContent } from '../lib/help.js';

export interface ListArgs extends SubcommandArgs {
    // No additional arguments for list command currently
}

/**
 * List all available templates with their details
 */
export class ListCommand extends BaseSubcommand<ListArgs> {
    readonly name = 'list';
    readonly description = 'List all available templates';
    
    protected getHelpContent(): HelpContent {
        return {
            usage: 'npx fabr list [options]',
            description: this.description,
            options: [
                { flag: '--help, -h', description: 'Show this help message' }
            ],
            examples: [
                { command: 'npx fabr list', description: 'List all templates' },
                { command: 'npx fabr list --help', description: 'Show this help' }
            ]
        };
    }

    parseArgs(rawArgs: string[]): ListArgs {
        const cleanArgs = parseSubcommandArgs(rawArgs, this.name);
        const parsed = parseSubcommandOnlyArgs(cleanArgs);
        
        return {
            help: parsed.help
        };
    }

    async execute(templates: Template[], args: ListArgs): Promise<void> {
        console.log(chalk.cyan.bold('Available Templates:\n'));
        
        if (templates.length === 0) {
            console.log(chalk.yellow('No templates available.'));
            return;
        }

        templates.forEach((template, index) => {
            console.log(chalk.white(`${index + 1}. `) + chalk.cyan(template.name));
            console.log(chalk.gray(`   Slug: ${template.slug}`));
            console.log(chalk.gray(`   Repository: ${template.repo}\n`));
        });

        console.log(chalk.white(`Total: ${templates.length} template${templates.length !== 1 ? 's' : ''} available`));
    }
}

// Create instance and export handler function for compatibility
const listCommand = new ListCommand();

export async function listCommandHandler(templates: Template[], args: string[]): Promise<void> {
    await listCommand.handle(templates, args);
}
