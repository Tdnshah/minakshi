import type { Block } from 'payload';

export const BookPullQuote: Block = {
  slug: 'book-pull-quote',
  labels: { singular: 'Pull Quote', plural: 'Pull Quotes' },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'cite', type: 'text', admin: { description: 'Optional attribution, e.g. "— Author\'s note".' } },
  ],
};
