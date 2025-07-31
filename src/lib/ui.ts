import { select, input } from '@inquirer/prompts';
import { Template } from '../types/templates.js';

/**
 * Prompts the user for the initial project setup info.
 * @param templates - The list of available templates.
 * @returns A promise that resolves to the user's answers.
 */
export const promptForProjectDetails = async (templates: Template[]): Promise<{ template: string; projectName: string }> => {
    const template = await select({
        message: 'Which project template would you like to use?',
        choices: templates.map(t => ({ name: t.name, value: t.slug })),
    });

    const projectName = await input({
        message: 'What is the name of your new project folder?',
        validate: (input: string) => 
            /^([A-Za-z\-\_\d])+$/.test(input) || 'Project name may only include letters, numbers, underscores and hashes.',
    });

    return {
        template,
        projectName
    };
};
