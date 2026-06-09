import { payloadFetch } from "./client";

function resolveMediaUrl(url?: string): string | undefined {
  if (!url) return url;
  if (url.startsWith("http")) return url;
  const base = ((import.meta.env.PAYLOAD_URL as string) ?? "").replace(/\/$/, "");
  return `${base}${url}`;
}

export async function fetchArticles() {
  const json = await payloadFetch<any>(
    "/api/articles?limit=100"
  );

  if (!json?.docs) return [];
  return json.docs.map((item: any) => ({
    ...item,
    date: new Date(item.date),
    image: resolveMediaUrl(item.image),
    tags: item.tags?.map((t: any) => t.tag) ?? [],
  }));


}
