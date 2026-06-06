import type { Block } from 'payload';

/**
 * Figures block — key statistics strip.
 * Maps to: app/src/components/system/Figures.astro
 */
export const Figures: Block = {
  slug: 'figures',
  labels: { singular: 'Figures', plural: 'Figures' },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      labels: { singular: 'Figure', plural: 'Figures' },
      fields: [
        { name: 'value', type: 'text', required: true, admin: { description: 'e.g. "20+", "4"' } },
        { name: 'label', type: 'text', required: true, admin: { description: 'e.g. "Years of fieldwork"' } },
      ],
    },
  ],
};
