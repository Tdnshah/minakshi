import { payloadFetch } from './client';
import { toSlug } from './books';

export interface PayloadConsultingProject {
  id: string;
  /** Derived from organisation + title (no slug field in the CMS) */
  slug: string;
  title: string;
  organisation: string;
  year?: string;
  description: string;
  domain: string[];
}

interface PayloadConsultingResponse {
  docs: Array<{
    id: string;
    title: string;
    organisation: string;
    year?: string;
    description: string;
    domain?: Array<{ domainName: string }>;
  }>;
}

export async function fetchConsulting(): Promise<PayloadConsultingProject[]> {
  try {
    const data = await payloadFetch<PayloadConsultingResponse>(
      '/api/consulting?limit=100',
    );
    const seen = new Map<string, number>();
    return data.docs.map((item) => {
      const base = toSlug(`${item.organisation} ${item.title}`) || item.id;
      const count = (seen.get(base) ?? 0) + 1;
      seen.set(base, count);
      return {
        ...item,
        slug: count > 1 ? `${base}-${count}` : base,
        domain: item.domain?.map((d) => d.domainName) ?? [],
      };
    });
  } catch (err) {
    console.error('[consulting] Failed to fetch from Payload CMS:', err instanceof Error ? err.message : err);
    return [];
  }
}


export async function fetchConsultingBySlug(
  slug: string,
): Promise<PayloadConsultingProject | null> {
  const all = await fetchConsulting();
  return all.find((item) => item.slug === slug) ?? null;
}
