import type { Block } from 'payload';

/**
 * FeaturedBook block — editorial spotlight on a single book.
 * Maps to: app/src/components/system/FeaturedBook.astro
 */
export const FeaturedBook: Block = {
  slug: 'featuredBook',
  labels: { singular: 'Featured Book', plural: 'Featured Books' },
  fields: [
    {
      name: 'book',
      type: 'relationship',
      relationTo: 'books',
      required: true,
      admin: { description: 'Pick the book to spotlight.' },
    },
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'The Latest · Non-fiction',
    },
    {
      name: 'primaryActionLabel',
      type: 'text',
      defaultValue: 'Read more →',
    },
    {
      name: 'secondaryActionLabel',
      type: 'text',
      defaultValue: 'All books',
    },
    {
      name: 'secondaryActionHref',
      type: 'text',
      defaultValue: '/books',
    },
  ],
};
