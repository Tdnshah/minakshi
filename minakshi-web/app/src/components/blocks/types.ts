/**
 * TypeScript shapes for Payload page-builder blocks.
 *
 * Hand-mirrored from cms/src/blocks/* configs because the Astro app does not
 * directly import payload-types.ts. Keep in sync when block configs change.
 *
 * Convention: each block has a `blockType` discriminator matching its `slug`.
 */
import type { PayloadMedia } from '../../lib/payload/books';

export interface HeroBlockData {
  blockType: 'hero';
  id?: string;
  eyebrow: string;
  firstName: string;
  lastName: string;
  description: string;
  roles: Array<{ id?: string; label: string }>;
  portraitImage: PayloadMedia;
  portraitCaption?: string;
  actions?: Array<{
    id?: string;
    label: string;
    href: string;
    variant?: 'primary' | 'ghost';
  }>;
}

export interface PressMarqueeBlockData {
  blockType: 'pressMarquee';
  id?: string;
  publications: Array<{ id?: string; name: string }>;
}

export interface FeaturedBookBlockData {
  blockType: 'featuredBook';
  id?: string;
  /** Relationship — populated object when depth>=1, string ID otherwise. */
  book: string | {
    id: string;
    title: string;
    subtitle?: string;
    excerpt?: string;
    publisher: string;
    releaseDate: string;
    isbn?: string;
    coverImage?: PayloadMedia;
  };
  eyebrow?: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
}

export interface LatestArticlesBlockData {
  blockType: 'latestArticles';
  id?: string;
  variant?: 'featured' | 'listing';
  heading?: string;
  pageSize?: number;
  articles: Array<string | {
    id: string;
    title: string;
    platform: string;
    url: string;
    date: string | Date;
    excerpt: string;
    image?: string;
    tags?: Array<{ tag: string }> | string[];
  }>;
  viewAllLabel?: string;
  viewAllHref?: string;
}

export interface FiguresBlockData {
  blockType: 'figures';
  id?: string;
  items: Array<{ id?: string; value: string; label: string }>;
}

export interface BooksGridBlockData {
  blockType: 'booksGrid';
  id?: string;
  heading: string;
  description?: string;
  maxItems?: number;
}

export type PageBlock =
  | HeroBlockData
  | PressMarqueeBlockData
  | FeaturedBookBlockData
  | LatestArticlesBlockData
  | FiguresBlockData
  | BooksGridBlockData;

// ── Book-detail blocks ────────────────────────────────────────────────────────

export interface BookThemesBlockData {
  blockType: 'book-themes';
  id?: string;
  eyebrow?: string;
  heading?: string;
  headingItalic?: string;
  items: Array<{
    id?: string;
    number: string;
    title: string;
    accentWord: string;
    description: string;
    tag: string;
  }>;
}

export interface BookExcerptBlockData {
  blockType: 'book-excerpt';
  id?: string;
  eyebrow?: string;
  title: string;
  paragraphs: Array<{ id?: string; text: string }>;
  cite?: string;
}

export interface BookBehindStatsBlockData {
  blockType: 'book-behind-stats';
  id?: string;
  eyebrow?: string;
  heading?: string;
  headingItalic?: string;
  stats: Array<{ id?: string; value: string; label: string }>;
}

export interface BookPullQuoteBlockData {
  blockType: 'book-pull-quote';
  id?: string;
  quote: string;
  cite?: string;
}

export interface BookAwardsBlockData {
  blockType: 'book-awards';
  id?: string;
  eyebrow?: string;
  heading?: string;
  headingItalic?: string;
  items: Array<{
    id?: string;
    title: string;
    organization: string;
    year?: number;
    status?: 'winner' | 'shortlisted' | 'longlisted' | 'nominated';
    url?: string;
  }>;
}

export interface BookEventsBlockData {
  blockType: 'book-events';
  id?: string;
  eyebrow?: string;
  heading?: string;
  headingItalic?: string;
  allEventsHref?: string;
  events: Array<{
    id?: string;
    name: string;
    date: string;
    venue?: string;
    city?: string;
    description?: string;
    url?: string;
    role?: string;
  }>;
}

export interface BookReviewsBlockData {
  blockType: 'book-reviews';
  id?: string;
  eyebrow?: string;
  heading?: string;
  headingItalic?: string;
  reviews: Array<{
    id?: string;
    quote: string;
    author: string;
    reviewer?: string;
    source?: string;
  }>;
}

export interface BookMediaBlockData {
  blockType: 'book-media';
  id?: string;
  eyebrow?: string;
  heading?: string;
  headingItalic?: string;
  items: Array<{
    id?: string;
    title: string;
    reviewer: string;
    url: string;
    type?: string;
    date: string;
  }>;
}

export interface BookBuyBlockData {
  blockType: 'book-buy';
  id?: string;
  eyebrow?: string;
  heading?: string;
  headingItalic?: string;
  links: Array<{
    id?: string;
    store: string;
    url: string;
    price?: string;
  }>;
}

export type BookBlock =
  | BookThemesBlockData
  | BookExcerptBlockData
  | BookBehindStatsBlockData
  | BookPullQuoteBlockData
  | BookAwardsBlockData
  | BookEventsBlockData
  | BookReviewsBlockData
  | BookMediaBlockData
  | BookBuyBlockData;
