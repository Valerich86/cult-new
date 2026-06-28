"use client";

import { motion } from "framer-motion";
import { font_default } from "@/lib/fonts";

interface Props {
  text: string;
  translateLeft?: boolean;
  options?: string;
}

export default function TextBlock({ text, translateLeft=false, options="bg-primary text-secondary" }: Props) {
  return (
    <div className={
      `${options} w-full h-full flex 
      justify-center items-center px-5 overflow-hidden`
      }>
      <motion.pre
        initial={{ x: translateLeft ? 100 : -100 }}
        whileInView={{ x: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.4 }}
        className={`${font_default.className} whitespace-pre-wrap`}
      >
        {text}
      </motion.pre>
    </div>
  );
}
