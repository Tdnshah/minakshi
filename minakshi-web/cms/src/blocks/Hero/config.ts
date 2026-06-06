import type { Block } from 'payload';

/**
 * Hero block — editorial homepage hero.
 * Maps to: app/src/components/system/HomeHero.astro
 */
export const Hero: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    { name: 'eyebrow', type: 'text', required: true },
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'roles',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Role', plural: 'Roles' },
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    { name: 'portraitImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'portraitCaption', type: 'text' },
    {
      name: 'actions',
      type: 'array',
      maxRows: 3,
      labels: { singular: 'Action', plural: 'Actions' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Ghost', value: 'ghost' },
          ],
        },
      ],
    },
  ],
};
