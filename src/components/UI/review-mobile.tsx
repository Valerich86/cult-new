import { VkReview } from "@/lib/utils";
import ReviewEntries from "./review-entries";

export default function ReviewMobile({
  review,
  current,
  index,
}: {
  review: VkReview;
  current: number;
  index: number;
}) {
  return (
    <div
      className={`w-full h-full bg-peachy1 p-2 shadow absolute inset-0 transition duration-300
        ${current === index ? "translate-x-0 opacity-100" : "translate-x-50 opacity-0"}`}
    >
      <ReviewEntries review={review}/>
    </div>
  );
}
