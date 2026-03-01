import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';
import {loadEnv} from 'payload/node';

loadEnv();



// https://astro.build/config
export default defineConfig(
    {
      // Placeholder domain
      site: 'https://minakshidewan.com',

      integrations: [sitemap()],

      vite: {
      server: {
        watch: {
          usePolling: true,
        },
      },
    },

      adapter: node({
        mode: 'standalone',
      }),
    },
);