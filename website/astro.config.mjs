// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    title: 'Fabr',
    description: 'Project Template Generator',
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