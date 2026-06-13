import type { Block } from 'payload';

export const BookExcerpt: Block = {
  slug: 'book-excerpt',
  labels: { singular: 'Book Excerpt', plural: 'Book Excerpts' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'An excerpt' },
    { name: 'title', type: 'text', required: true, admin: { description: 'Displayed as a large italic heading.' } },
    {
      name: 'paragraphs',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Paragraph', plural: 'Paragraphs' },
      fields: [
        { name: 'text', type: 'textarea', required: true },
      ],
    },
    { name: 'cite', type: 'text', admin: { description: 'Attribution line (chapter title, page reference, etc.).' } },
  ],
};
