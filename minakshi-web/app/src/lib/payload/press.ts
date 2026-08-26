import { payloadFetch } from './client';

export interface PayloadPressItem {
  id: string;
  title: string;
  type: 'Interview' | 'Review' | 'Excerpt' | 'Podcast';
  outlet: string;
  url: string;
  date: Date;
  embedCode?: string;
}

interface PayloadPressResponse {
  docs: Array<Omit<PayloadPressItem, 'date'> & { date: string }>;
}

export async function fetchPress(): Promise<PayloadPressItem[]> {
  try {
    const data = await payloadFetch<PayloadPressResponse>(
      '/api/press?limit=100',
    );
    return data.docs
      .map((item) => ({ ...item, date: new Date(item.date) }))
      .sort((a, b) => b.date.valueOf() - a.date.valueOf());
  } catch (err) {
    console.error('[press] Failed to fetch from Payload CMS:', err instanceof Error ? err.message : err);
    return [];
  }
}
