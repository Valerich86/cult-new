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
      initial={{ scale: 0.8 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15,
        delay: 0.2 * index,
      }}
      className="h-100 w-[30%] bg-peachy1 p-2 shadow"
    >
      <ReviewEntries review={review} />
    </motion.div>
  );
}
