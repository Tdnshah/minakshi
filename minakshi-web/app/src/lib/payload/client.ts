const BASE_URL = (import.meta.env.PAYLOAD_URL as string).replace(/\/$/, ''); // strip trailing slash

const API_KEY = import.meta.env.PAYLOAD_API_KEY;

export async function payloadFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${BASE_URL}${path}`;

  let res: Response;
  try {
    res = await fetch(url, {
      ...options,
      headers: {
        Authorization: `users API-Key ${API_KEY}`,
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });
  } catch (err) {
    const cause = err instanceof Error ? err.message : String(err);
    throw new Error(`Payload CMS unreachable at ${BASE_URL} — ${cause}`);
  }

  if (!res.ok) {
    throw new Error(`Payload API error: ${res.status} ${res.statusText} (${path})`);
  }

  return res.json();
}