import { payloadFetch } from './client';

export interface PayloadMedia {
  id: string;
  url: string;
  filename: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface PayloadBuyLink {
  id?: string;
  store: string;
  url: string;
  price?: string;
}

export interface PayloadReview {
  id?: string;
  quote: string;
  author: string;
  source?: string;
}

export interface PayloadMediaCoverage {
  id?: string;
  title: string;
  reviewer: string;
  url: string;
  type?: string;
  date: string;
}

export interface PayloadAward {
  id?: string;
  title: string;
  organization: string;
  year?: number;
  status?: 'winner' | 'shortlisted' | 'longlisted' | 'nominated';
  url?: string;
}

export interface PayloadBookEvent {
  id?: string;
  name: string;
  date: string;
  venue?: string;
  city?: string;
  description?: string;
  url?: string;
  role?: string;
}

export interface PayloadEventGalleryItem {
  id?: string;
  image?: PayloadMedia;
  caption?: string;
}


export interface PayloadBookTheme {
  id?: string;
  number: string;
  title: string;
  accentWord: string;
  description: string;
  tag: string;
}

export interface PayloadBookStat {
  id?: string;
  value: string;
  label: string;
}

export interface PayloadBook {
  id: string;
  title: string;
  subtitle?: string;
  excerpt?: string;
  /** Lexical JSON rich text */
  description?: unknown;
  coverImage?: PayloadMedia;
  isbn?: string;
  publisher: string;
  releaseDate: string;
  buyLinks?: PayloadBuyLink[];
  awards?: PayloadAward[];
  reviews?: PayloadReview[];
  mediaCoverage?: PayloadMediaCoverage[];
  bookEvents?: PayloadBookEvent[];
  eventGallery?: PayloadEventGalleryItem[];
  /** Extended editorial fields — added to CMS in a future migration */
  themes?: PayloadBookTheme[];
  excerptEyebrow?: string;
  excerptTitle?: string;
  excerptText?: string;
  excerptCite?: string;
  behindStats?: PayloadBookStat[];
  pullQuote?: string;
  pullQuoteCite?: string;
  /** Extra content sections from the book block builder */
  blocks?: unknown[];
  updatedAt: string;
  createdAt: string;
}

interface PayloadBooksResponse {
  docs: PayloadBook[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/** Convert a book title to a URL-safe slug */
export function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Resolve a media URL — makes relative paths absolute using the CMS base URL */
function resolveMediaUrl(url?: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  const base = (import.meta.env.PAYLOAD_URL as string ?? '').replace(/\/$/, '');
  return `${base}${url}`;
}

function resolveBookMedia(book: PayloadBook): PayloadBook {
  if (book.coverImage?.url) {
    book.coverImage.url = resolveMediaUrl(book.coverImage.url);
  }
  book.eventGallery?.forEach(g => {
    if (g.image?.url) g.image.url = resolveMediaUrl(g.image.url);
  });
  return book;
}

export async function fetchBooks(): Promise<PayloadBook[]> {
  try {
    const data = await payloadFetch<PayloadBooksResponse>(
      '/api/books?limit=100&depth=1',
    );
    return data.docs.map(resolveBookMedia);
  } catch (err) {
    console.error('[books] Failed to fetch from Payload CMS:', err instanceof Error ? err.message : err);
    return [];
  }
}

export async function fetchBookBySlug(slug: string): Promise<PayloadBook | null> {
  try {
    const books = await fetchBooks();
    return books.find((book) => toSlug(book.title) === slug) ?? null;
  } catch {
    return null;
  }
}
