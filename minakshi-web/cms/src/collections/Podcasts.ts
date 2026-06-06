import { CollectionConfig } from 'payload';

export const Podcasts: CollectionConfig = {
  slug: 'podcasts',
  admin: { useAsTitle: 'title' },
  access: {
    read: ({ req }) => {
      return !!req.user;   // allow only API key requests
    },
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'url', type: 'text', required: true },
    { name: 'platform', type: 'text', required: true },
    { name: 'publishedAt', type: 'date', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'slug', type: 'text' },
  ],
};