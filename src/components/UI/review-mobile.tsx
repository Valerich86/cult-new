"use client";

import { motion } from "framer-motion";
import TruncatedText from "./trancated-text";
import ImageBlock from "./image-block";
import { VkReview } from "@/lib/utils";

export default function ReviewMobile({ review, current, index }: { review: VkReview; current: number; index: number }) {
  return (
    <div
      className={
        `w-full h-full bg-peachy1 p-2 shadow absolute inset-0 transition duration-300
        ${current === index ? "translate-x-0 opacity-100" : "translate-x-50 opacity-0"}`
      }
    >
      <div className="w-full h-1/2">
        <div className="flex justify-between w-full py-3">
          <strong>{review.authorName}</strong>
          <time dateTime={new Date(review.date * 1000).toISOString()}>
            {new Date(review.date * 1000).toLocaleDateString("ru-RU")}
          </time>
        </div>
        <TruncatedText text={review.text} maxLines={6} />
      </div>
      {review.authorPhoto && (
        <div className="w-full h-1/2 bg-secondary">
          <img src={review.authorPhoto} alt={`photo from VK url=${review.authorPhoto}`} className="object-cover w-full h-full grayscale-90" />
        </div>
      )}
    </div>
  );
}
