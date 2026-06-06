import { payloadFetch } from './client';
import type { PageBlock, HeroBlockData, FeaturedBookBlockData } from '../../components/blocks/types';

export interface PageDoc {
  id: string;
  title: string;
  slug: string;
  meta?: {
    title?: string;
    description?: string;
    ogImage?: { url: string };
  };
  blocks: PageBlock[];
  updatedAt: string;
  createdAt: string;
}

interface PagesResponse {
  docs: PageDoc[];
  totalDocs: number;
}

/** Make a media path absolute against the CMS base URL. */
function absolutize(url?: string): string | undefined {
  if (!url) return url;
  if (/^https?:\/\//.test(url)) return url;
  const base = ((import.meta.env.PAYLOAD_URL as string) ?? '').replace(/\/$/, '');
  return `${base}${url}`;
}

/**
 * Walk blocks once and rewrite any relative media URLs to absolute.
 * Keeps adapters dumb — they assume URLs are usable as-is.
 */
function normalizeBlocks(blocks: PageBlock[]): PageBlock[] {
  for (const block of blocks) {
    if (block.blockType === 'hero') {
      const hero = block as HeroBlockData;
      if (hero.portraitImage?.url) hero.portraitImage.url = absolutize(hero.portraitImage.url)!;
      if (hero.portraitImage && !hero.portraitImage.alt) {
        hero.portraitImage.alt = `Portrait of ${hero.firstName} ${hero.lastName}`;
      }
    }
    if (block.blockType === 'featuredBook') {
      const fb = block as FeaturedBookBlockData;
      if (typeof fb.book === 'object' && fb.book?.coverImage?.url) {
        fb.book.coverImage.url = absolutize(fb.book.coverImage.url)!;
      }
    }
    if (block.blockType === 'latestArticles') {
      for (const a of block.articles) {
        if (typeof a === 'object' && a.image) a.image = absolutize(a.image)!;
      }
    }
  }
  return blocks;
}

/** Fetch a single page by its slug. Returns null when not found. */
export async function fetchPageBySlug(slug: string): Promise<PageDoc | null> {
  try {
    const data = await payloadFetch<PagesResponse>(
      `/api/pages?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=2`,
    );
    const page = data.docs?.[0];
    if (!page) return null;
    page.blocks = normalizeBlocks(page.blocks ?? []);
    if (page.meta?.ogImage?.url) page.meta.ogImage.url = absolutize(page.meta.ogImage.url)!;
    return page;
  } catch (err) {
    console.error(
      '[pages] Failed to fetch from Payload CMS:',
      err instanceof Error ? err.message : err,
    );
    return null;
  }
}
