/**
 * Base interfaces and types for subcommands
 */

import { Template } from './templates.js';
import { HelpContent, formatHelpContent } from '../lib/help.js';

export interface SubcommandArgs {
    help: boolean;
}

export interface SubcommandDefinition<T extends SubcommandArgs = SubcommandArgs> {
    name: string;
    description: string;
    parseArgs: (args: string[]) => T;
    showHelp: () => void;
    execute: (templates: Template[], args: T) => Promise<void>;
}

/**
 * Base class for implementing subcommands with consistent structure
 */
export abstract class BaseSubcommand<T extends SubcommandArgs = SubcommandArgs> implements SubcommandDefinition<T> {
    /**
     * Command name - must be implemented by subclass
     */
    abstract readonly name: string;
    
    /**
     * Command description - must be implemented by subclass
     */
    abstract readonly description: string;
    
    /**
     * Help content - can be overridden by subclass
     */
    protected abstract getHelpContent(): HelpContent;
    
    abstract parseArgs(args: string[]): T;
    abstract execute(templates: Template[], args: T): Promise<void>;
    
    /**
     * Show help for this command - uses getHelpContent()
     */
    showHelp(): void {
        const helpContent = this.getHelpContent();
        console.log(formatHelpContent(this.name, helpContent));
    }
    
    /**
     * Main handler that follows the common pattern:
     * 1. Parse arguments
     * 2. Show help if requested
     * 3. Execute the command
     */
    async handle(templates: Template[], rawArgs: string[]): Promise<void> {
        const args = this.parseArgs(rawArgs);
        
        if (args.help) {
            this.showHelp();
            process.exit(0);
        }
        
        await this.execute(templates, args);
    }
}
