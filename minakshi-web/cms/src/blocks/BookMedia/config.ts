import type { Block } from 'payload';

export const BookMedia: Block = {
  slug: 'book-media',
  labels: { singular: 'Media Coverage', plural: 'Media Coverage' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'As seen in' },
    { name: 'heading', type: 'text', defaultValue: 'Coverage &' },
    { name: 'headingItalic', type: 'text', defaultValue: 'interviews.' },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Item', plural: 'Items' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'reviewer', type: 'text', required: true, admin: { description: 'Publication name.' } },
        { name: 'url', type: 'text', required: true },
        {
          name: 'type',
          type: 'text',
          admin: { description: 'e.g. "Review", "Interview", "Feature"' },
        },
        { name: 'date', type: 'date', required: true },
      ],
    },
  ],
};
