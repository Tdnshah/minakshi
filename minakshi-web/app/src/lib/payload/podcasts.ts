import { payloadFetch } from "./client";

export async function fetchPodcasts(podcastsId) {

  if(!podcastsId){
      const json = await payloadFetch<any>(
        "/api/podcasts?limit=100&where[platform][contains]=youtube"
      );
      if (!json?.docs) return [];
      return json.docs.map((item: any) => ({
        ...item,
        publishedAt: new Date(item.publishedAt),
      }));
  }
  const json = await payloadFetch<any>(
    "/api/podcasts/" + podcastsId
  );
  return json;

}