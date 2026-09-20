import type { Block } from 'payload';

export const BookBuyBlock: Block = {
  slug: 'book-buy',
  labels: { singular: 'Buy Links', plural: 'Buy Links' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Get the book' },
    { name: 'heading', type: 'text', defaultValue: 'Where to' },
    { name: 'headingItalic', type: 'text', defaultValue: 'buy.' },
    {
      name: 'links',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Retailer', plural: 'Retailers' },
      fields: [
        { name: 'store', type: 'text', required: true, admin: { description: 'e.g. "Amazon", "Flipkart"' } },
        { name: 'url', type: 'text', required: true },
        { name: 'price', type: 'text', admin: { description: 'Optional price label, e.g. "₹499"' } },
      ],
    },
  ],
};
