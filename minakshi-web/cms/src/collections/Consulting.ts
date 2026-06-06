import { CollectionConfig } from 'payload';

export const Consulting: CollectionConfig = {
  slug: 'consulting',
  admin: { useAsTitle: 'organisation' },
  access: {
    read: ({ req }) => {
      return !!req.user;   // allow only API key requests
    },
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'organisation', type: 'text', required: true },
    { name: 'year', type: 'text'}, // supports ranges
    { name: 'description', type: 'textarea', required: true },

    {
      name: 'domain',
      type: 'array',
      required: true,
      fields: [
        { name: 'domainName', type: 'text', required: true },
      ],
    },
  ],
};