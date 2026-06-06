// src/loaders/myApiLoader.ts
import type { Loader } from 'astro/loaders';

export function payloadApiContentLoader(apiEndpoint: string): Loader {
  return {
    name: 'payloadAPIContentLoader',
    load: async ({ store, meta, logger }) => {
      logger.info(`Fetching data from ${apiEndpoint}`);
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error(`API fetch failed: ${response.statusText}`);
        }
        const data = await response.json();

        // Assuming data is an array of objects
        if (!Array.isArray(data)) {
          throw new Error('API did not return an array of entries');
        }

        store.clear(); // Clear existing entries

        data.forEach((entry, index) => {
          // Each entry needs a unique 'id' and a 'data' object
          store.set({
            id: entry.id || String(index), // Use existing ID or generate one
            data: entry,
          });
        });
        meta.set("lastSynced", String(Date.now())); // Optional: track sync time
      } catch (error) {
        logger.error(`Error loading API content: ${(error as Error).message}`);
        throw error;
      }
    },
  };
}
