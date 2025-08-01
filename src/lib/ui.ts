import { search, input } from '@inquirer/prompts';
import { Template } from '../types/templates.js';

/**
 * Prompts the user for the initial project setup info.
 * @param templates - The list of available templates.
 * @returns A promise that resolves to the user's answers.
 */
export const promptForProjectDetails = async (templates: Template[]): Promise<{ template: string; projectName: string }> => {
    const template = await search({
        message: 'Which project template would you like to use?',
        source: (input) => {
            if (!input) {
                return templates.map(t => ({ name: t.name, value: t.slug, description: t.repo }));
            }
            
            const filtered = templates.filter(t => 
                t.name.toLowerCase().includes(input.toLowerCase()) ||
                t.slug.toLowerCase().includes(input.toLowerCase()) ||
                t.repo.toLowerCase().includes(input.toLowerCase())
            );
            
            return filtered.map(t => ({ name: t.name, value: t.slug, description: t.repo }));
        },
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
