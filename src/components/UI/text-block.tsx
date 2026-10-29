"use client";

import { motion } from "framer-motion";
import { font_default } from "../../lib/fonts";

interface Props {
  text: string;
  animate?: boolean;
  options?: string;
}

export default function TextBlock({ text, animate=true, options="bg-primary px-4 text-secondary sm:text-2xl xl:text-base" }: Props) {
  return (
    <div className={
      `${options} w-full h-full flex items-center overflow-hidden`
      }>
      <motion.pre
        initial={{ y: animate ? 30 : 0, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.4 }}
        className={`${font_default.className} whitespace-pre-wrap`}
      >
        {text}
      </motion.pre>
    </div>
  );
}
