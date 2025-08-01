import chalk from 'chalk';
import { Template } from '../types/templates.js';

/**
 * List all available templates
 */
export async function listCommand(templates: Template[]): Promise<void> {
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
