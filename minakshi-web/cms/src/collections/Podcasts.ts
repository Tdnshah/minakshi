import { CollectionConfig } from 'payload';

export const Podcasts: CollectionConfig = {
  slug: 'podcasts',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'url', type: 'text', required: true },
    { name: 'publishedAt', type: 'date', required: true },
    { name: 'platform', type: 'text', required: true },
    { name: 'duration', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'thumbnail', type: 'text' },
  ],
};