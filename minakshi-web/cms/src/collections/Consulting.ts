import { CollectionConfig } from 'payload';

export const Consulting: CollectionConfig = {
  slug: 'consulting',
  admin: { useAsTitle: 'organisation' },
  fields: [
    { name: 'organisation', type: 'text', required: true },
    { name: 'year', type: 'text', required: true }, // supports ranges
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