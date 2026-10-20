"use client";

import { motion } from "framer-motion";
import TruncatedText from "./trancated-text";
import ImageBlock from "./image-block";
import { VkReview } from "@/lib/utils";
import Link from "next/link";
import { font_caption } from "@/lib/fonts";

export default function ReviewMobile({
  review,
  current,
  index,
}: {
  review: VkReview;
  current: number;
  index: number;
}) {
  const MAX_LINES = 6;

  return (
    <div
      className={`w-full h-full bg-peachy1 p-2 shadow absolute inset-0 transition duration-300
        ${current === index ? "translate-x-0 opacity-100" : "translate-x-50 opacity-0"}`}
    >
      <div className="w-full h-1/2 flex flex-col justify-between pb-2">
        <div className="flex justify-between w-full py-3">
          <strong>{review.authorName}</strong>
          <time dateTime={new Date(review.date * 1000).toISOString()}>
            {new Date(review.date * 1000).toLocaleDateString("ru-RU")}
          </time>
        </div>
        <p
          className={`text-base xl:text-xs overflow-hidden 
          line-clamp-${MAX_LINES} [--line-clamp:${MAX_LINES}]
        `}
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
        <div className="w-full h-1/2 bg-secondary">
          <img
            src={review.authorPhoto ? review.authorPhoto : "/tech/skull.jpg"}
            alt={`photo from VK url=${review.authorPhoto}`}
            className="object-cover w-full h-full grayscale-90"
          />
        </div>
    </div>
  );
}
