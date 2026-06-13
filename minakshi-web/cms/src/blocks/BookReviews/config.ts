import type { Block } from 'payload';

export const BookReviews: Block = {
  slug: 'book-reviews',
  labels: { singular: 'Press Reviews', plural: 'Press Reviews' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Press & reviews' },
    { name: 'heading', type: 'text', defaultValue: 'What others have' },
    { name: 'headingItalic', type: 'text', defaultValue: 'said.' },
    {
      name: 'reviews',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Review', plural: 'Reviews' },
      fields: [
        { name: 'quote', type: 'textarea', required: true },
        { name: 'author', type: 'text', required: true, admin: { description: 'Publication name.' } },
        { name: 'reviewer', type: 'text', admin: { description: 'Reviewer name (optional).' } },
        { name: 'source', type: 'text', admin: { description: 'URL to original review.' } },
      ],
    },
  ],
};
