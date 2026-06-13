import type { Block } from 'payload';

export const BookThemes: Block = {
  slug: 'book-themes',
  labels: { singular: 'Book Themes', plural: 'Book Themes' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'What the book covers' },
    { name: 'heading', type: 'text', defaultValue: 'Six threads, one' },
    { name: 'headingItalic', type: 'text', defaultValue: 'shroud.' },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 9,
      labels: { singular: 'Theme', plural: 'Themes' },
      fields: [
        { name: 'number', type: 'text', required: true, admin: { description: 'Roman numeral, e.g. "I." or "II."' } },
        { name: 'title', type: 'text', required: true },
        { name: 'accentWord', type: 'text', required: true, admin: { description: 'Word in title rendered in italic accent.' } },
        { name: 'description', type: 'textarea', required: true },
        { name: 'tag', type: 'text', required: true, admin: { description: 'e.g. "Chapters 1–4"' } },
      ],
    },
  ],
};
