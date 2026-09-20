import type { Block } from 'payload';

export const BookEventsBlock: Block = {
  slug: 'book-events',
  labels: { singular: 'Events Section', plural: 'Events Sections' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Coming up' },
    { name: 'heading', type: 'text', defaultValue: 'The book on' },
    { name: 'headingItalic', type: 'text', defaultValue: 'tour.' },
    { name: 'allEventsHref', type: 'text', defaultValue: '/events', admin: { description: 'Link for "All events →" action.' } },
    {
      name: 'events',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Event', plural: 'Events' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'date', type: 'date', required: true },
        { name: 'venue', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'url', type: 'text' },
        { name: 'role', type: 'text', admin: { description: 'e.g. "Author talk", "Keynote"' } },
      ],
    },
  ],
};
