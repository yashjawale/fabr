/**
 * Utilities for help content formatting
 */

export interface HelpContent {
    usage?: string;
    description?: string;
    arguments?: Array<{ name: string; description: string }>;
    options?: Array<{ flag: string; description: string }>;
    examples?: Array<{ command: string; description: string }>;
}

/**
 * Format help content into a readable string
 */
export function formatHelpContent(commandName: string, content: HelpContent): string {
    let output = '';
    
    if (content.usage) {
        output += `\nUsage: ${content.usage}\n`;
    } else {
        output += `\nUsage: npx fabr ${commandName} [options]\n`;
    }
    
    if (content.description) {
        output += `\nDescription:\n  ${content.description}\n`;
    }
    
    if (content.arguments && content.arguments.length > 0) {
        output += '\nArguments:\n';
        content.arguments.forEach(arg => {
            output += `  ${arg.name.padEnd(20)} ${arg.description}\n`;
        });
    }
    
    if (content.options && content.options.length > 0) {
        output += '\nOptions:\n';
        content.options.forEach(opt => {
            output += `  ${opt.flag.padEnd(20)} ${opt.description}\n`;
        });
    }
    
    if (content.examples && content.examples.length > 0) {
        output += '\nExamples:\n';
        content.examples.forEach(example => {
            const comment = example.description ? ` # ${example.description}` : '';
            output += `  ${example.command.padEnd(42)}${comment}\n`;
        });
    }
    
    output += '\n';
    return output;
}
