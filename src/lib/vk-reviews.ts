import type { VkReview } from "./utils";

export async function getReviews(limit = 5): Promise<VkReview[]> {
  const url = new URL("https://api.vk.com/method/board.getComments");
  url.searchParams.set("group_id", process.env.VK_GROUP_ID!);
  url.searchParams.set("topic_id", process.env.VK_TOPIC_ID!);
  url.searchParams.set("count", String(limit));
  url.searchParams.set("sort", "desc"); // сначала новые
  url.searchParams.set("extended", "1"); // вернуть профили авторов
  url.searchParams.set("v", "5.199");
  url.searchParams.set("access_token", process.env.VK_SERVICE_TOKEN!);

  const res = await fetch(url, { next: { revalidate: 600 } }); // кэш на 10 минут
  const json = await res.json();

  console.log("json:");
  console.log(json);

  if (json.error) {
    throw new Error(`VK API: ${json.error.error_msg}`);
  }

  const profiles = new Map<number, { name: string; photo?: string }>();
  for (const p of json.response.profiles ?? []) {
    profiles.set(p.id, { name: `${p.first_name} ${p.last_name}`, photo: p.photo_100 });
  }
  // если кто-то из авторов — само сообщество
  for (const g of json.response.groups ?? []) {
    profiles.set(-g.id, { name: g.name, photo: g.photo_100 });
  }

  return json.response.items.map((c: any) => ({
    id: c.id,
    text: c.text,
    date: c.date,
    authorName: profiles.get(c.from_id)?.name ?? "Гость",
    authorPhoto: profiles.get(c.from_id)?.photo,
  }));
}
