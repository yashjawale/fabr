#!/usr/bin/env node

import chalk from 'chalk';

// Import types
import { TemplatesConfig, validateTemplatesConfig } from './types/templates.js';
import { executeCommand } from './commands/index.js';

// Load the list of available templates
import templatesData from './templates.json' with { type: 'json' };

// Validate templates configuration
if (!validateTemplatesConfig(templatesData)) {
    console.error('Invalid templates.json configuration');
    process.exit(1);
}

const templatesConfig = templatesData as TemplatesConfig;
const templates = templatesConfig.templates;

/**
 * Parse command line arguments and execute the appropriate command
 */
async function main() {
    const args = process.argv.slice(2);
    
    // Handle global help flags when no command is provided or help is explicitly requested
    if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
        await executeCommand('help', templates, args);
        return;
    }
    
    const command = args[0];
    await executeCommand(command, templates, args);
}

main();
