import chalk from 'chalk'
import { Template } from '../types/templates.js'
import { parseSubcommandArgs, parseSubcommandOnlyArgs } from '../lib/args.js'
import { BaseSubcommand, SubcommandArgs } from '../types/subcommand.js'
import { HelpContent } from '../lib/help.js'

interface SearchArgs extends SubcommandArgs {
	query: string
	exact: boolean
	case: boolean
}

/**
 * Search through available templates and display matching results
 */
export class SearchCommand extends BaseSubcommand<SearchArgs> {
	readonly name = 'search'
	readonly description = 'Search templates by name, slug, or repository'

	/**
	 * Get help content configuration for the search command.
	 * Returns usage instructions, description, options, and examples for the search command.
	 *
	 * @returns {HelpContent} Help content object with usage, description, options, and examples
	 * @protected
	 */
	protected getHelpContent(): HelpContent {
		return {
			usage: 'npx fabr search <query> [options]',
			description: this.description,
			options: [
				{ flag: '--exact', description: 'Search for exact matches only' },
				{ flag: '--case', description: 'Case-sensitive search' },
				{ flag: '--help, -h', description: 'Show this help message' },
			],
			examples: [
				{
					command: 'npx fabr search react',
					description: 'Search for templates containing "react"',
				},
				{
					command: 'npx fabr search --exact chrome-ext',
					description: 'Search for exact match of "chrome-ext"',
				},
				{
					command: 'npx fabr search typescript --case',
					description: 'Case-sensitive search for "typescript"',
				},
				{ command: 'npx fabr search --help', description: 'Show this help' },
			],
		}
	}

	/**
	 * Parse command line arguments for the search command.
	 * Extracts and validates arguments specific to the search command.
	 *
	 * @param {string[]} rawArgs - Raw command line arguments
	 *
	 * @returns {SearchArgs} Parsed search command arguments
	 */
	parseArgs(rawArgs: string[]): SearchArgs {
		const cleanArgs = parseSubcommandArgs(rawArgs, this.name)
		const parsed = parseSubcommandOnlyArgs(cleanArgs)

		// Get the search query from positional arguments
		const query = parsed.positional.join(' ').trim()

		// Parse flags
		const exact = Boolean(parsed.flags.exact)
		const caseSensitive = Boolean(parsed.flags.case)

		return {
			help: parsed.help,
			query,
			exact,
			case: caseSensitive,
		}
	}

	/**
	 * Search templates based on the query and options.
	 * Searches through template name, slug, and repository fields.
	 *
	 * @param {Template[]} templates - Array of templates to search through
	 * @param {string} query - Search query string
	 * @param {boolean} exact - Whether to perform exact match search
	 * @param {boolean} caseSensitive - Whether search should be case-sensitive
	 *
	 * @returns {Template[]} Array of matching templates
	 * @private
	 */
	private searchTemplates(
		templates: Template[],
		query: string,
		exact: boolean,
		caseSensitive: boolean,
	): Template[] {
		if (!query) {
			return templates
		}

		const searchQuery = caseSensitive ? query : query.toLowerCase()

		return templates.filter(template => {
			const name = caseSensitive ? template.name : template.name.toLowerCase()
			const slug = caseSensitive ? template.slug : template.slug.toLowerCase()
			const repo = caseSensitive ? template.repo : template.repo.toLowerCase()

			if (exact) {
				return name === searchQuery || slug === searchQuery || repo === searchQuery
			} else {
				return (
					name.includes(searchQuery) || slug.includes(searchQuery) || repo.includes(searchQuery)
				)
			}
		})
	}

	/**
	 * Display detailed information about a template.
	 * Shows name, slug, repository, and any additional metadata.
	 *
	 * @param {Template} template - The template to display
	 * @param {number} index - The index number for display
	 * @private
	 */
	private displayTemplateDetails(template: Template, index: number): void {
		console.log(chalk.white(`${index + 1}. `) + chalk.cyan.bold(template.name))
		console.log(chalk.gray(`   Slug: `) + chalk.white(template.slug))
		console.log(chalk.gray(`   Repository: `) + chalk.blue(template.repo))

		// Parse repository to show organization/owner and project name
		const repoMatch = template.repo.match(/^(?:https?:\/\/github\.com\/)?([^/]+)\/([^/]+)/)
		if (repoMatch) {
			const [, owner, repoName] = repoMatch
			console.log(chalk.gray(`   Owner: `) + chalk.yellow(owner))
			console.log(chalk.gray(`   Project: `) + chalk.green(repoName))
		}

		console.log() // Empty line for spacing
	}

	/**
	 * Execute the search command.
	 * Performs the search based on provided query and options, then displays results.
	 * Shows appropriate messages for no query, no results, or successful matches.
	 *
	 * @param {Template[]} templates - Array of available templates to search through
	 * @param {SearchArgs} args - Parsed search command arguments
	 *
	 * @returns {Promise<void>} A promise that resolves when the search is complete
	 */
	async execute(templates: Template[], args: SearchArgs): Promise<void> {
		const { query, exact, case: caseSensitive } = args

		// Show all templates if no query provided
		if (!query) {
			console.log(chalk.yellow('No search query provided. Showing all templates:\n'))
			const results = templates
			results.forEach((template, index) => {
				this.displayTemplateDetails(template, index)
			})
			console.log(
				chalk.white(
					`Total: ${results.length} template${results.length !== 1 ? 's' : ''} available`,
				),
			)
			return
		}

		// Display search parameters
		console.log(chalk.cyan.bold('Search Results'))
		console.log(chalk.gray(`Query: "${query}"`))
		if (exact) {
			console.log(chalk.gray('Mode: Exact match'))
		}
		if (caseSensitive) {
			console.log(chalk.gray('Case: Sensitive'))
		}
		console.log() // Empty line

		// Perform the search
		const results = this.searchTemplates(templates, query, exact, caseSensitive)

		// Display results
		if (results.length === 0) {
			console.log(chalk.yellow('No templates found matching your search criteria.'))
			console.log(chalk.gray('Try using different keywords or removing search options.'))
			return
		}

		results.forEach((template, index) => {
			this.displayTemplateDetails(template, index)
		})

		// Display summary
		const totalCount = results.length
		const summary = `Found ${totalCount} template${totalCount !== 1 ? 's' : ''} matching "${query}"`
		console.log(chalk.green.bold(summary))

		// Show usage hint if results found
		if (totalCount > 0) {
			console.log(
				chalk.gray(`\nTo create a project, use: `) +
					chalk.white(`npx fabr init <project-name> --template=<slug>`),
			)
		}
	}
}
