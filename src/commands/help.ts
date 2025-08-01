import chalk from 'chalk';

/**
 * Show help information
 */
export function showHelp() {
    console.log(chalk.cyan.bold('Fabr - Project Template Generator 🚀\n'));
    console.log(chalk.white('Usage:'));
    console.log(chalk.cyan('  npx fabr <command>') + chalk.gray('  Execute a command\n'));
    console.log(chalk.white('Available Commands:'));
    console.log(chalk.cyan('  init') + chalk.gray('    Create a new project from a template'));
    console.log(chalk.cyan('  list') + chalk.gray('    List all available templates'));
    console.log(chalk.cyan('  help') + chalk.gray('    Show this help message\n'));
    console.log(chalk.white('Global Options:'));
    console.log(chalk.cyan('  --help, -h') + chalk.gray('  Show help for any command\n'));
    console.log(chalk.white('Examples:'));
    console.log(chalk.gray('  npx fabr init'));
    console.log(chalk.gray('  npx fabr list'));
    console.log(chalk.gray('  npx fabr help\n'));
}

/**
 * Handle the help command
 */
export async function helpCommand(): Promise<void> {
    showHelp();
    process.exit(0);
}
