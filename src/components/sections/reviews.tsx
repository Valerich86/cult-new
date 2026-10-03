import { getReviews } from "@/lib/vk-reviews";

export default async function ReviewsSection() {
  let reviews: Awaited<ReturnType<typeof getReviews>> = [];
  try {
    reviews = await getReviews(10);
  } catch (e) {
    console.error(e); // VK недоступен — просто не рендерим блок
  }

  if (!reviews.length) return null;

  return (
    <section className="reviews">
      <h2>Отзывы</h2>
      <ul>
        {reviews.map((r) => (
          <li key={r.id} className="review">
            {r.authorPhoto && <img src={r.authorPhoto} alt="" width={40} height={40} />}
            <div>
              <strong>{r.authorName}</strong>
              <time dateTime={new Date(r.date * 1000).toISOString()}>
                {new Date(r.date * 1000).toLocaleDateString("ru-RU")}
              </time>
              <p>{r.text}</p>
            </div>
          </li>
        ))}
      </ul>
      <a
        href={`https://vk.com/topic-${process.env.VK_GROUP_ID}_${process.env.VK_TOPIC_ID}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Все отзывы →
      </a>
    </section>
  );
}
