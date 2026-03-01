import { CollectionConfig } from 'payload';

export const Books: CollectionConfig = {
  slug: 'books',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text' },
    { name: 'description', type: 'richText', required: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'isbn', type: 'text' },
    { name: 'publisher', type: 'text', required: true },
    { name: 'releaseDate', type: 'date', required: true },

    {
      name: 'buyLinks',
      type: 'array',
      fields: [
        { name: 'store', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },

    {
      name: 'reviews',
      type: 'array',
      fields: [
        { name: 'quote', type: 'textarea', required: true },
        { name: 'author', type: 'text', required: true },
        { name: 'source', type: 'text' },
      ],
    },

    {
      name: 'mediaCoverage',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'reviewer', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
        { name: 'type', type: 'text' },
        { name: 'date', type: 'date', required: true },
      ],
    },

    {
      name: 'eventGallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },

    {
      name: 'bookKits',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
};