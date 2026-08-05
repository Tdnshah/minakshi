import { payloadFetch } from './client';

export interface PayloadFilm {
  id: string;
  title: string;
  collaborator: string;
  description: string;
  expectedRelease?: string;
  notes?: string;
}

interface PayloadFilmsResponse {
  docs: PayloadFilm[];
}

export async function fetchFilms(): Promise<PayloadFilm[]> {
  try {
    const data = await payloadFetch<PayloadFilmsResponse>(
      '/api/films?limit=100',
    );
    return data.docs;
  } catch (err) {
    console.error('[films] Failed to fetch from Payload CMS:', err instanceof Error ? err.message : err);
    return [];
  }
}
