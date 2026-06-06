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
  heading: string;
  articles: Array<string | {
    id: string;
    title: string;
    platform: string;
    url: string;
    date: string;
    excerpt: string;
    image?: string;
    tags?: Array<{ tag: string }>;
  }>;
  viewAllLabel?: string;
  viewAllHref?: string;
}

export interface FiguresBlockData {
  blockType: 'figures';
  id?: string;
  items: Array<{ id?: string; value: string; label: string }>;
}

export type PageBlock =
  | HeroBlockData
  | PressMarqueeBlockData
  | FeaturedBookBlockData
  | LatestArticlesBlockData
  | FiguresBlockData;
