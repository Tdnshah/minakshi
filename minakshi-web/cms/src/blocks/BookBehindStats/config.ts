import type { Block } from 'payload';

export const BookBehindStats: Block = {
  slug: 'book-behind-stats',
  labels: { singular: 'Behind the Book', plural: 'Behind the Book' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'How it was made' },
    { name: 'heading', type: 'text', defaultValue: 'Behind the' },
    { name: 'headingItalic', type: 'text', defaultValue: 'book.' },
    {
      name: 'stats',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      labels: { singular: 'Stat', plural: 'Stats' },
      fields: [
        { name: 'value', type: 'text', required: true, admin: { description: 'e.g. "4" or "<em>4</em>" for italic.' } },
        { name: 'label', type: 'text', required: true, admin: { description: 'e.g. "Years of research"' } },
      ],
    },
  ],
};
