import { CollectionConfig } from 'payload';

export const Films: CollectionConfig = {
  slug: 'films',
  admin: { useAsTitle: 'title' },
  access: {
    read: ({ req }) => {
      return !!req.user;   // allow only API key requests
    },
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'collaborator', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'expectedRelease', type: 'text' },
    { name: 'notes', type: 'textarea' },
  ],
};