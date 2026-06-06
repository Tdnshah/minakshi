import type { Block } from 'payload';

/**
 * LatestArticles block — curated grid of feature articles.
 * Maps to: app/src/components/blocks/LatestArticlesBlock.astro
 */
export const LatestArticles: Block = {
  slug: 'latestArticles',
  labels: { singular: 'Latest Articles', plural: 'Latest Articles' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Latest', required: true },
    {
      name: 'articles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
      required: true,
      minRows: 1,
      maxRows: 6,
      admin: { description: 'Pick the articles to feature (recommended: 3).' },
    },
    { name: 'viewAllLabel', type: 'text', defaultValue: 'View all →' },
    { name: 'viewAllHref', type: 'text', defaultValue: '/articles' },
  ],
};
