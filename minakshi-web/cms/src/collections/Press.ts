import { CollectionConfig } from 'payload';

export const Press: CollectionConfig = {
  slug: 'press',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Interview', value: 'Interview' },
        { label: 'Review', value: 'Review' },
        { label: 'Excerpt', value: 'Excerpt' },
        { label: 'Podcast', value: 'Podcast' },
      ],
    },
    { name: 'outlet', type: 'text', required: true },
    { name: 'url', type: 'text', required: true },
    { name: 'date', type: 'date', required: true },
    { name: 'thumbnail', type: 'upload', relationTo: 'media' },
    { name: 'embedCode', type: 'textarea' },
  ],
};