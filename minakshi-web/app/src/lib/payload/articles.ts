import { payloadFetch } from "./client";

export async function fetchArticles() {
  const json = await payloadFetch<any>(
    "/api/articles?limit=100"
  );

  if (!json?.docs) return [];
  return json.docs.map((item: any) => ({
    ...item,
    date: new Date(item.date),
    tags: item.tags?.map((t: any) => t.tag) ?? [],
  }));


}