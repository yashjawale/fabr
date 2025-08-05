/**
 * Argument parsing utilities for the Fabr CLI
 */

export interface ParsedArgs {
    command?: string;
    positional: string[];
    flags: Record<string, string | boolean>;
    help: boolean;
}

export interface SubcommandResult<T = Record<string, any>> {
    args: T;
    help: boolean;
}

/**
 * Parse command line arguments into a structured format
 */
export function parseArgs(args: string[]): ParsedArgs {
    const result: ParsedArgs = {
        positional: [],
        flags: {},
        help: false
    };

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        if (arg === '--help' || arg === '-h') {
            result.help = true;
        } else if (arg.startsWith('--')) {
            // Handle --key=value or --key
            const [key, ...valueParts] = arg.substring(2).split('=');
            const value = valueParts.length > 0 ? valueParts.join('=') : true;
            result.flags[key] = value;
        } else if (arg.startsWith('-') && arg.length > 1) {
            // Handle short flags like -h or -t value
            const flagsStr = arg.substring(1);
            
            // Check if this might be a flag with a value
            const nextArg = i + 1 < args.length ? args[i + 1] : null;
            const hasValue = nextArg && !nextArg.startsWith('-');
            
            if (flagsStr.length === 1 && hasValue) {
                // Single character flag with value: -t value
                result.flags[flagsStr] = nextArg;
                i++; // Skip next argument as it's the value
            } else {
                // Handle multiple short flags or single flag without value
                const flags = flagsStr.split('');
                flags.forEach(flag => {
                    if (flag === 'h') {
                        result.help = true;
                    } else {
                        result.flags[flag] = true;
                    }
                });
            }
        } else {
            // Positional argument
            if (!result.command) {
                result.command = arg;
            } else {
                result.positional.push(arg);
            }
        }
    }

    return result;
}

/**
 * Parse arguments for subcommands (treats all non-flag arguments as positional)
 */
export function parseSubcommandOnlyArgs(args: string[]): Omit<ParsedArgs, 'command'> & { positional: string[] } {
    const result = {
        positional: [] as string[],
        flags: {} as Record<string, string | boolean>,
        help: false
    };

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        if (arg === '--help' || arg === '-h') {
            result.help = true;
        } else if (arg.startsWith('--')) {
            // Handle --key=value or --key
            const [key, ...valueParts] = arg.substring(2).split('=');
            const value = valueParts.length > 0 ? valueParts.join('=') : true;
            result.flags[key] = value;
        } else if (arg.startsWith('-') && arg.length > 1) {
            // Handle short flags like -h or -t value
            const flagsStr = arg.substring(1);
            
            // Check if this might be a flag with a value
            const nextArg = i + 1 < args.length ? args[i + 1] : null;
            const hasValue = nextArg && !nextArg.startsWith('-');
            
            if (flagsStr.length === 1 && hasValue) {
                // Single character flag with value: -t value
                result.flags[flagsStr] = nextArg;
                i++; // Skip next argument as it's the value
            } else {
                // Handle multiple short flags or single flag without value
                const flags = flagsStr.split('');
                flags.forEach(flag => {
                    if (flag === 'h') {
                        result.help = true;
                    } else {
                        result.flags[flag] = true;
                    }
                });
            }
        } else {
            // All non-flag arguments are positional for subcommands
            result.positional.push(arg);
        }
    }

    return result;
}

/**
 * Generic subcommand argument parser
 * Removes the command name from args and returns clean arguments for the subcommand
 */
export function parseSubcommandArgs(args: string[], commandName: string): string[] {
    // Remove the command name if it's the first argument
    if (args[0] === commandName) {
        return args.slice(1);
    }
    return args;
}

/**
 * Validate project name format
 */
export function validateProjectName(name: string): { valid: boolean; error?: string } {
    if (!name) {
        return { valid: false, error: 'Project name cannot be empty.' };
    }

    if (!/^([A-Za-z\-\_\d])+$/.test(name)) {
        return { 
            valid: false, 
            error: 'Project name may only include letters, numbers, underscores and hyphens.' 
        };
    }

    if (name.length > 100) {
        return { 
            valid: false, 
            error: 'Project name must be 100 characters or less.' 
        };
    }

    return { valid: true };
}
