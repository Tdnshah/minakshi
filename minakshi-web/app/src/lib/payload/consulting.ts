import { payloadFetch } from './client';

export interface PayloadConsultingProject {
  id: string;
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
    return data.docs.map((item) => ({
      ...item,
      domain: item.domain?.map((d) => d.domainName) ?? [],
    }));
  } catch (err) {
    console.error('[consulting] Failed to fetch from Payload CMS:', err instanceof Error ? err.message : err);
    return [];
  }
}
