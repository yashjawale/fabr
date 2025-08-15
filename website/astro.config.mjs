// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://yashjawale.github.io',
	base: 'fabr',
	integrations: [starlight({
		title: 'fabr Docs',
		description: 'A simple CLI tool to bootstrap projects with templates faster than ever before',
		logo: {
			dark: './src/assets/fabr-docs-dark.svg',
			light: './src/assets/fabr-docs-light.svg',
			alt: 'fabr Docs',
			replacesTitle: true,
		},
		customCss: [
			'./src/styles/starlight-theme.css',
		],
		expressiveCode: {
			themes: ['github-light', 'github-dark'],
		},
		sidebar: [
			{
				label: 'General',
				items: [
					{ label: 'Getting Started', slug: 'docs' },
				],
			},
		],
	})],
	vite: {
		plugins: [tailwindcss()]
	}
});