import chalk from 'chalk';
import { Template } from '../types/templates.js';
import { parseSubcommandOnlyArgs, parseSubcommandArgs } from '../lib/args.js';
import { BaseSubcommand, SubcommandArgs } from '../types/subcommand.js';
import { HelpContent } from '../lib/help.js';

type ListArgs = SubcommandArgs;

/**
 * List all available templates with their details
 */
export class ListCommand extends BaseSubcommand<ListArgs> {
    readonly name = 'list';
    readonly description = 'List all available templates';
    
    /**
     * Get help content configuration for the list command.
     * Returns usage instructions, description, options, and examples for the list command.
     * 
     * @returns {HelpContent} Help content object with usage, description, options, and examples
     * @protected
     */
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

    /**
     * Parse command line arguments for the list command.
     * Extracts and validates arguments specific to the list command.
     * 
     * @param {string[]} rawArgs - Raw command line arguments
	 * 
     * @returns {ListArgs} Parsed list command arguments
     */
    parseArgs(rawArgs: string[]): ListArgs {
        const cleanArgs = parseSubcommandArgs(rawArgs, this.name);
        const parsed = parseSubcommandOnlyArgs(cleanArgs);
        
        return {
            help: parsed.help
        };
    }

    /**
     * Execute the list command.
     * Displays all available templates with their names, slugs, and repositories.
     * Shows a count of total templates at the end.
     * 
     * @param {Template[]} templates - Array of available templates to display
	 * 
     * @returns {Promise<void>} A promise that resolves when the template list is displayed
     */
    async execute(templates: Template[]): Promise<void> {
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
