"use client";

import { motion } from "framer-motion";
import TruncatedText from "./trancated-text";
import ImageBlock from "./image-block";
import { VkReview } from "@/lib/utils";

export default function ReviewDesktop({ review, index }: { review: VkReview; index: number }) {
  return (
    <motion.div
      initial={{ scale: 0.95 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ delay: 0.2 * index, duration: 0.3 }}
      className="w-full h-100 sm:w-[40%] xl:w-[30%] bg-peachy1 p-2 shadow"
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
    </motion.div>
  );
}
