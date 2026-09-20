import type { Block } from 'payload';

export const BookAwardsBlock: Block = {
  slug: 'book-awards',
  labels: { singular: 'Awards List', plural: 'Awards Lists' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Recognition' },
    { name: 'heading', type: 'text', defaultValue: 'Awards &' },
    { name: 'headingItalic', type: 'text', defaultValue: 'longlists.' },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Award', plural: 'Awards' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'organization', type: 'text', required: true },
        { name: 'year', type: 'number' },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'shortlisted',
          options: [
            { label: 'Winner', value: 'winner' },
            { label: 'Shortlisted', value: 'shortlisted' },
            { label: 'Longlisted', value: 'longlisted' },
            { label: 'Nominated', value: 'nominated' },
          ],
        },
        { name: 'url', type: 'text' },
      ],
    },
  ],
};
