import type { Block } from 'payload';

export const MediaColumnsBlock: Block = {
  slug: 'mediaColumns',
  labels: { singular: 'Media Columns', plural: 'Media Columns' },
  fields: [
    {
      name: 'layout',
      type: 'select',
      defaultValue: '2col',
      options: [
        { label: '2 columns', value: '2col' },
        { label: '3 columns', value: '3col' },
        { label: '4 columns', value: '4col' },
      ],
    },
    {
      name: 'columns',
      label: 'Images',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text', admin: { description: 'Optional caption shown below the image.' } },
      ],
    },
  ],
};
