import type { CollectionConfig } from 'payload';
import { blocks } from '../blocks';

/**
 * Pages — the page builder collection.
 * Each page has a unique slug and an ordered list of blocks.
 * The Astro frontend resolves a page via slug (home, about, etc.) and renders
 * its blocks through the BlockRenderer adapter layer.
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'updatedAt'] },
  access: {
    read: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Internal title (also used for the browser tab unless meta.title is set).' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          'URL path segment. Use "home" for the homepage. Use forward slashes for nested paths (e.g. "about/team").',
      },
    },
    {
      type: 'group',
      name: 'meta',
      label: 'SEO',
      fields: [
        { name: 'title', type: 'text', admin: { description: 'Overrides the tab title.' } },
        { name: 'description', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'blocks',
      type: 'blocks',
      required: true,
      minRows: 1,
      blocks,
    },
  ],
};
