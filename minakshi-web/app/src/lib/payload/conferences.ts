import { payloadFetch } from './client';

export interface PayloadConferenceMediaLink {
  id?: string;
  label: string;
  url: string;
}

export interface PayloadConference {
  id: string;
  title: string;
  institution: string;
  abstract: string;
  year: number;
  location: string;
  mediaLinks?: PayloadConferenceMediaLink[];
}

interface PayloadConferencesResponse {
  docs: PayloadConference[];
}

export async function fetchConferences(): Promise<PayloadConference[]> {
  try {
    const data = await payloadFetch<PayloadConferencesResponse>(
      '/api/conferences?limit=100',
    );
    return data.docs;
  } catch (err) {
    console.error('[conferences] Failed to fetch from Payload CMS:', err instanceof Error ? err.message : err);
    return [];
  }
}
