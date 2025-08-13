// @ts-check
import { defineConfig } from 'astro/config';

import starlight from '@astrojs/starlight';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
      title: 'My delightful docs site',
    })],

  vite: {
    plugins: [tailwindcss()]
  }
});