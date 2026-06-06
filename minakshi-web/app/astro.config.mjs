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
        // Add this for production/standalone mode
      server: {
        port: 4322,
        host: true, // Recommended for production
      },

      vite: {
      server: {
        port: 4322,
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