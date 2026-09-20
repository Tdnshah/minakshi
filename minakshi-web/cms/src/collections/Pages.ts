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
      type: 'collapsible',
      label: 'Navigation',
      fields: [
        {
          name: 'showInNavigation',
          type: 'checkbox',
          defaultValue: true,
          admin: { description: 'Show this page in the site header navigation.' },
        },
        {
          name: 'navigationLabel',
          type: 'text',
          admin: {
            description: 'Optional short label override for menu display. Defaults to title.',
          },
        },
        {
          name: 'navigationGroup',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary Menu', value: 'primary' },
            { label: 'My Works', value: 'myWorks' },
            { label: 'Media', value: 'media' },
          ],
        },
        {
          name: 'navigationOrder',
          type: 'number',
          defaultValue: 100,
        },
      ],
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
      blocks,
      admin: {
        description:
          'Optional page-builder blocks. Leave empty when this slug should resolve to an Astro file-based page.',
      },
    },
  ],
};
