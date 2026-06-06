import { CollectionConfig } from 'payload';

export const Conferences: CollectionConfig = {
  slug: 'conferences',
  admin: { useAsTitle: 'title' },
  access: {
    read: ({ req }) => {
      return !!req.user;   // allow only API key requests
    },
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'institution', type: 'text', required: true },
    { name: 'abstract', type: 'textarea', required: true },
    { name: 'year', type: 'number', required: true },
    { name: 'location', type: 'text', required: true },
    {
      name: 'mediaLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
};