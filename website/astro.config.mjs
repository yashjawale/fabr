// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    title: 'Fabr',
    description: 'Project Template Generator',
	logo: {
		dark: './src/assets/fabr-docs-dark.svg',
		light: './src/assets/fabr-docs-light.svg',
		alt: 'fabr Docs',
		replacesTitle: true,
	},
    customCss: [
      './src/styles/global.css',
    ],
    expressiveCode: {
      themes: ['github-light', 'github-dark'],
    },
    sidebar: [
      {
        label: 'Documentation',
        items: [
          { label: 'Getting Started', slug: 'docs' },
          { label: 'Style Guide', slug: 'style-guide' },
        ],
      },
    ],
  })],
  vite: {
    plugins: [tailwindcss()]
  }
});