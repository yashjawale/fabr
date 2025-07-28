import chalk from 'chalk';
import inquirer from 'inquirer';

type CaseType = 'kebab' | 'pascal' | 'camel' | 'snake' | 'constant';

interface Placeholder {
    key: string;
    prompt?: string;
    description?: string;
    transform?: {
        source: string;
        case: CaseType;
    };
    defaultCase?: {
        source: string;
        case: CaseType;
        template?: string;
    };
}

/**
 * Transforms a string into various cases.
 * @param input - The source string.
 * @param format - The target case.
 * @returns The transformed string.
 */
const transformCase = (input: string, format: CaseType): string => {
    const words = input.split(/[\s_-]+/).filter(Boolean);
    switch (format) {
        case 'kebab': return words.map(w => w.toLowerCase()).join('-');
        case 'pascal': return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
        case 'camel': return words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
        case 'snake': return words.map(w => w.toLowerCase()).join('_');
        case 'constant': return words.map(w => w.toUpperCase()).join('_');
        default: return input;
    }
};

/**
 * Processes placeholder configurations to get final values.
 * @param placeholderConfig - The array of placeholder objects.
 * @param promptUser - The function to prompt the user for input.
 * @returns An object mapping placeholder keys to their final values.
 */
export const processPlaceholders = async (
    placeholderConfig: Placeholder[] | undefined,
    promptUser: (questions: any[]) => Promise<any>
): Promise<Record<string, string>> => {
    const placeholderValues: Record<string, string> = {};
    if (!placeholderConfig || placeholderConfig.length === 0) {
        return placeholderValues;
    }

    console.log(chalk.cyan('\nPlease provide values for the following placeholders:'));

    const promptedPlaceholders = placeholderConfig.filter(p => p.prompt);
    const derivedPlaceholders = placeholderConfig.filter(p => p.transform);

    for (const p of promptedPlaceholders) {
        let defaultValue: string | undefined = undefined;

        if (p.defaultCase) {
            const sourceValue = placeholderValues[p.defaultCase.source];
            if (sourceValue) {
                const transformed = transformCase(sourceValue, p.defaultCase.case);
                defaultValue = p.defaultCase.template
                    ? p.defaultCase.template.replace('{value}', transformed)
                    : transformed;
            }
        }

        const answers = await promptUser([
            {
                type: 'input',
                name: p.key,
                message: p.prompt,
                default: defaultValue,
                suffix: p.description ? `\n  ${chalk.gray(p.description)}` : '',
            },
        ]);
        placeholderValues[p.key] = answers[p.key];
    }

    derivedPlaceholders.forEach(p => {
        if (p.transform) {
            const sourceValue = placeholderValues[p.transform.source];
            if (sourceValue) {
                placeholderValues[p.key] = transformCase(sourceValue, p.transform.case);
            } else {
                console.warn(chalk.yellow(`Warning: Source placeholder '${p.transform.source}' for derived key '${p.key}' not found.`));
            }
        }
    });

    return placeholderValues;
};
