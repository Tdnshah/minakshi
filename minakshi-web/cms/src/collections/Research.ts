import { CollectionConfig } from 'payload';

export const Research: CollectionConfig = {
  slug: 'research',
  admin: { useAsTitle: 'title' },
  access: {
    read: ({ req }) => {
      return !!req.user;   // allow only API key requests
    },
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'category', type: 'text', required: true },
    { name: 'abstract', type: 'richText', required: true },
    { name: 'publication', type: 'text', required: true },
    { name: 'year', type: 'number', required: true },
    { name: 'url', type: 'text' },
  ],
};