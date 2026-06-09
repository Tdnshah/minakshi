import type { Block } from 'payload';

/**
 * LatestArticles block — curated grid of feature articles.
 * Maps to: app/src/components/blocks/LatestArticlesBlock.astro
 */
export const LatestArticles: Block = {
  slug: 'latestArticles',
  labels: { singular: 'Latest Articles', plural: 'Latest Articles' },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'featured',
      options: [
        { label: 'Featured (curated)', value: 'featured' },
        { label: 'Listing (paginated grid)', value: 'listing' },
      ],
      required: true,
    },
    { name: 'heading', type: 'text', defaultValue: 'Latest', required: true },
    {
      name: 'pageSize',
      type: 'number',
      defaultValue: 9,
      min: 1,
      admin: {
        condition: (_, siblingData) => siblingData?.variant === 'listing',
        description: 'Cards per page for listing variant.',
      },
    },
    {
      name: 'articles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
      maxRows: 6,
      admin: {
        condition: (_, siblingData) => siblingData?.variant !== 'listing',
        description: 'Pick the articles to feature (recommended: 3).',
      },
      validate: (value, { siblingData }) => {
        if (siblingData?.variant === 'listing') return true;
        if (Array.isArray(value) && value.length > 0) return true;
        return 'Please select at least one article for featured variant.';
      },
    },
    { name: 'viewAllLabel', type: 'text', defaultValue: 'View all →' },
    { name: 'viewAllHref', type: 'text', defaultValue: '/articles' },
  ],
};
