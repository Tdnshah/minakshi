import { CollectionConfig } from 'payload';
import { BookThemes } from '../blocks/BookThemes/config';
import { BookExcerpt } from '../blocks/BookExcerpt/config';
import { BookBehindStats } from '../blocks/BookBehindStats/config';
import { BookPullQuote } from '../blocks/BookPullQuote/config';
import { BookAwardsBlock } from '../blocks/BookAwards/config';
import { BookEventsBlock } from '../blocks/BookEvents/config';
import { BookReviews } from '../blocks/BookReviews/config';
import { BookMedia } from '../blocks/BookMedia/config';
import { BookBuyBlock } from '../blocks/BookBuy/config';

const bookBlocks = [
  BookThemes, BookExcerpt, BookBehindStats, BookPullQuote,
  BookAwardsBlock, BookEventsBlock, BookReviews, BookMedia, BookBuyBlock,
];

export const Books: CollectionConfig = {
  slug: 'books',
  admin: { useAsTitle: 'title' },
  access: {
    read: ({ req }) => {
      return !!req.user;   // allow only API key requests
    },
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text' },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Short blurb shown in the hero section and book listings (2–4 sentences).',
      },
    },
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
      name: 'awards',
      type: 'array',
      admin: {
        description: 'Awards, shortlists, and recognitions the book has received.',
      },
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
        { name: 'url', type: 'text', admin: { description: 'Link for more info (optional).' } },
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
      name: 'bookEvents',
      type: 'array',
      admin: {
        description: 'Book talks, signings, launches, and other events.',
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'date', type: 'date', required: true },
        { name: 'venue', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'url', type: 'text', admin: { description: 'Optional link to event page or recording.' } },
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
        {
          name: 'caption',
          type: 'text',
          admin: { description: 'Optional caption for this photo.' },
        },
      ],
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: bookBlocks,
      admin: {
        description:
          'Optional extra content sections. Use these to add themes, excerpts, pull quotes, extra press grids, events, or buy links beyond the structured fields above.',
      },
    },
  ],
};