
import { CollectionConfig } from 'payload';

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: { useAsTitle: 'title' },
  access: {
    read: ({ req }) => {
      return !!req.user;   // allow only API key requests
    },
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'platform', type: 'text', required: true },
    { name: 'url', type: 'text', required: true },
    { name: 'date', type: 'date', required: true },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'image', type: 'text' },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text' }],
    },
  ],
};