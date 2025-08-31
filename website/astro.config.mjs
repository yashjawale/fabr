// @ts-check
import starlight from '@astrojs/starlight'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

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
			expressiveCode: {
				themes: ['github-light', 'github-dark'],
			},
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'getting-started/introduction' },
						{ label: 'Installation', slug: 'getting-started/installation' },
						{ label: 'Quick Start', slug: 'getting-started/quick-start' },
					],
				},
				{
					label: 'Add Your Templates',
					items: [
						{ label: 'Overview', slug: 'templates/overview' },
						{ label: 'File-Based Templates', slug: 'templates/file-based' },
						{ label: 'Command-Based Templates', slug: 'templates/command-based' },
						{ label: 'Environment Variables', slug: 'templates/environment-variables' },
						{ label: 'Configuration Reference', slug: 'templates/configuration' },
					],
				},
				{
					label: 'Contributing',
					items: [
						{ label: 'How to Contribute', slug: 'contributing/overview' },
						{ label: 'Development Setup', slug: 'contributing/development' },
						{ label: 'Adding Templates', slug: 'contributing/templates' },
					],
				},
				{
					label: 'Developer Reference',
					items: [
						{ label: 'API Documentation', slug: 'developer/api' },
						{ label: 'Architecture', slug: 'developer/architecture' },
						{
							label: 'Generated API',
							collapsed: true,
							autogenerate: { directory: 'developer/generated' },
						},
					],
				},
			],
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
})
