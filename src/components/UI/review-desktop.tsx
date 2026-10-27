"use client";

import { motion } from "framer-motion";
import { VkReview } from "../../lib/utils";
import ReviewEntries from "./review-entries";

export default function ReviewDesktop({
  review,
  index,
}: {
  review: VkReview;
  index: number;
}) {
  return (
    <motion.div
      initial={{ scale: 0.95 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ delay: 0.2 * index, duration: 0.3 }}
      className="h-100 w-[30%] bg-peachy1 p-2 shadow"
    >
      <ReviewEntries review={review}/>
    </motion.div>
  );
}
