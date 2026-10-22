import { font_caption } from "@/lib/fonts";
import { VkReview } from "@/lib/utils";
import Link from "next/link";

export default function ReviewEntries({ review }: { review: VkReview }) {
  const MAX_LINES = 6;
  return (
    <>
      <div className="w-full h-1/2 flex flex-col justify-between pb-2">
        <div className="flex justify-between w-full py-3">
          <strong>{review.authorName}</strong>
          <time dateTime={new Date(review.date * 1000).toISOString()}>
            {new Date(review.date * 1000).toLocaleDateString("ru-RU")}
          </time>
        </div>
        <p
          className={`text-xs overflow-hidden line-clamp-6`}
          style={{ lineClamp: MAX_LINES }}
        >
          {review.text}
        </p>
        {review.vkHref && (
          <div className="w-full text-right">
            <Link
              href={review.vkHref}
              target={"_blank"}
              className={`${font_caption.className} animate-pulse text-lg`}
            >
              {"Читать в VK"}
            </Link>
          </div>
        )}
      </div>
      <div className="w-full h-1/2 bg-primary">
        <img
          src={review.authorPhoto ? review.authorPhoto : "/tech/logo-FG-2.webp"}
          alt={`photo from VK url=${review.authorPhoto}`}
          className="object-cover w-full h-full grayscale-90"
        />
      </div>
    </>
  );
}
