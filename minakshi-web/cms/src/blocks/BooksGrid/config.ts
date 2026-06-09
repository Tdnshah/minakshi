import type { Block } from 'payload';

/**
 * BooksGrid block — reusable books listing section for internal pages.
 * Maps to: app/src/components/blocks/BooksGridBlock.astro
 */
export const BooksGrid: Block = {
  slug: 'booksGrid',
  labels: { singular: 'Books Grid', plural: 'Books Grids' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Books',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'maxItems',
      type: 'number',
      defaultValue: 0,
      min: 0,
      admin: {
        description: '0 = show all books. Otherwise limit to latest N books.',
      },
    },
  ],
};
