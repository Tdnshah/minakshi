import { payloadFetch } from './client';

type NavigationGroup = 'primary' | 'myWorks' | 'media';

interface PageForNavigation {
  id: string;
  title: string;
  slug: string;
  navigationLabel?: string;
  showInNavigation?: boolean;
  navigationGroup?: NavigationGroup;
  navigationOrder?: number;
}

interface PagesResponse {
  docs: PageForNavigation[];
}

export interface NavigationChildItem {
  href: string;
  label: string;
}

export interface NavigationItem {
  href?: string;
  label: string;
  children?: NavigationChildItem[];
}

function toPath(slug: string): string {
  return slug === 'home' ? '/' : `/${slug}`;
}

const FALLBACK_NAVIGATION: NavigationItem[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/books', label: 'Books' },
  {
    label: 'My Works',
    children: [
      { href: '/articles', label: 'Articles' },
      { href: '/conferences', label: 'Conferences' },
      { href: '/consulting', label: 'Consulting' },
    ],
  },
  {
    label: 'Media',
    children: [
      { href: '/media', label: 'Press & News' },
      { href: '/podcasts', label: 'Podcasts' },
    ],
  },
  { href: '/contact', label: 'Contact' },
];

/**
 * Build header navigation from CMS Pages collection.
 * New pages appear automatically when `showInNavigation=true`.
 */
export async function fetchNavigation(): Promise<NavigationItem[]> {
  try {
    let data: PagesResponse;
    try {
      data = await payloadFetch<PagesResponse>(
        '/api/pages?where[showInNavigation][equals]=true&limit=100&depth=0&sort=navigationOrder',
      );
    } catch {
      // Backward compatibility: before navigation fields are migrated.
      data = await payloadFetch<PagesResponse>('/api/pages?limit=100&depth=0');
    }

    const pages = (data.docs ?? []).sort(
      (a, b) => (a.navigationOrder ?? 100) - (b.navigationOrder ?? 100),
    );
    const primary = pages
      .filter((p) => (p.showInNavigation ?? true) && (p.navigationGroup ?? 'primary') === 'primary')
      .map((p) => ({ href: toPath(p.slug), label: p.navigationLabel || p.title }));
    const myWorks = pages
      .filter((p) => (p.showInNavigation ?? true) && p.navigationGroup === 'myWorks')
      .map((p) => ({ href: toPath(p.slug), label: p.navigationLabel || p.title }));
    const media = pages
      .filter((p) => (p.showInNavigation ?? true) && p.navigationGroup === 'media')
      .map((p) => ({ href: toPath(p.slug), label: p.navigationLabel || p.title }));

    const nav: NavigationItem[] = [...primary];
    if (myWorks.length) nav.push({ label: 'My Works', children: myWorks });
    if (media.length) nav.push({ label: 'Media', children: media });

    return nav.length ? nav : FALLBACK_NAVIGATION;
  } catch (err) {
    console.error('[navigation] Failed to fetch from Payload CMS:', err instanceof Error ? err.message : err);
    return FALLBACK_NAVIGATION;
  }
}
