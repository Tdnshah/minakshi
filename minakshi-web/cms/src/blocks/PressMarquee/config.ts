import type { Block } from 'payload';

/**
 * PressMarquee block — scrolling publication names on ink panel.
 * Maps to: app/src/components/system/PressMarquee.astro
 */
export const PressMarquee: Block = {
  slug: 'pressMarquee',
  labels: { singular: 'Press Marquee', plural: 'Press Marquees' },
  fields: [
    {
      name: 'publications',
      type: 'array',
      required: true,
      minRows: 1,
      admin: { description: 'Publication names that scroll across the strip.' },
      fields: [{ name: 'name', type: 'text', required: true }],
    },
  ],
};
