// @ts-check
import starlight from '@astrojs/starlight'
import starlightMermaid from '@pasqal-io/starlight-client-mermaid'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc'

// https://astro.build/config
export default defineConfig({
	site: 'https://yashjawale.github.io',
	base: 'fabr',
	integrations: [
		starlight({
			title: 'fabr Docs',
			description: 'A simple CLI tool to bootstrap projects with templates faster than ever before',
			logo: {
				dark: './src/assets/fabr-docs-dark.svg',
				light: './src/assets/fabr-docs-light.svg',
				alt: 'fabr Docs',
				replacesTitle: true,
			},
			customCss: ['./src/styles/starlight-theme.css'],
			pagination: true,
			lastUpdated: true,
			editLink: {
				baseUrl: 'https://github.com/yashjawale/fabr/edit/main/website/',
			},
			head: [
				{
					tag: 'meta',
					attrs: {
						name: 'theme-color',
						content: '#3b82f6',
					},
				},
			],
			expressiveCode: {
				themes: ['github-light', 'github-dark'],
			},
			plugins: [
				starlightMermaid(),
				starlightTypeDoc({
					entryPoints: ['../src/lib/**/*.ts', '../src/types/**/*.ts', '../src/commands/**/*.ts'],
					tsconfig: '../tsconfig.json',
					typeDoc: {
						excludePrivate: true,
						excludeProtected: true,
						excludeInternal: true,
						skipErrorChecking: true,
						entryPointStrategy: 'expand',
						categorizeByGroup: false,
						groupOrder: ['Functions', 'Classes', 'Interfaces', 'Type Aliases', 'Variables'],
						sort: ['alphabetical'],
					},
					sidebar: {
						label: 'API Reference',
						collapsed: false,
					},
					output: 'docs/api',
				}),
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'docs/getting-started/introduction' },
						{ label: 'Installation', slug: 'docs/getting-started/installation' },
						{ label: 'Quick Start', slug: 'docs/getting-started/quick-start' },
					],
				},
				{
					label: 'Add Your Templates',
					items: [
						{ label: 'Overview', slug: 'docs/templates/overview' },
						{ label: 'File-Based Templates', slug: 'docs/templates/file-based' },
						{ label: 'Command-Based Templates', slug: 'docs/templates/command-based' },
						{ label: 'Environment Variables', slug: 'docs/templates/environment-variables' },
						{ label: 'Template Examples', slug: 'docs/templates/examples' },
						{ label: 'Configuration Reference', slug: 'docs/templates/configuration' },
					],
				},
				{
					label: 'Contributing',
					items: [
						{ label: 'How to Contribute', slug: 'docs/contributing/overview' },
						{ label: 'Development Setup', slug: 'docs/contributing/development' },
						{ label: 'Adding Templates', slug: 'docs/contributing/templates' },
					],
				},
				typeDocSidebarGroup,
			],
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
})
