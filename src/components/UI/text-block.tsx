"use client";

import { motion } from "framer-motion";
import { font_default } from "../../lib/fonts";
import AnimatedTitle from "../animation/title";

interface Props {
  text: string;
  animType?: "fromBottom" | "fromRight";
  options?: string;
}

export default function TextBlock({
  text,
  animType = "fromBottom",
  options = "bg-primary px-4 text-secondary sm:text-2xl xl:text-base",
}: Props) {
  return (
    <div
      className={`${options} w-full h-full flex items-center overflow-hidden`}
    >
      {text.length < 20 ? (
          <p className={`w-full py-1 text-2xl text-secondary text-center bg-primary`}>{text}</p>
      ) : (
      <motion.pre
        initial={{
          y: animType === "fromBottom" ? 30 : 0,
          x: animType === "fromBottom" ? 0 : 30,
          opacity: 0,
        }}
        whileInView={{ y: 0, x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.4 }}
        className={`${font_default.className} whitespace-pre-wrap`}
      >
        {text}
      </motion.pre>
      )}
    </div>
  );
}
