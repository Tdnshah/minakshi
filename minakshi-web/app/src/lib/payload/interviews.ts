import { payloadFetch } from "./client";

export async function fetchInterviews(interviewId) {

  if(!interviewId){

      const platforms = [
        "Times of India",
        "The Times of India",
        "The Hindu",
        "Mid-Day",
        "Navbharat Times",
        "Spotify"
      ];

      const query = platforms.map(p => encodeURIComponent(p)).join(",");
      const json = await payloadFetch<any>(
        `/api/podcasts?limit=100&where[platform][in]=${query}`
      );
      console.log(json);
      if (!json?.docs) return [];
      return json.docs.map((item: any) => ({
        ...item,
        publishedAt: new Date(item.publishedAt),
      }));
  }
  const json = await payloadFetch<any>(
    "/api/podcasts/" + interviewId
  );
  return json;

}