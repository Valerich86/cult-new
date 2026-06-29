"use client";

import { motion } from "framer-motion";
import { font_caption } from "@/lib/fonts";

interface Props {
  text: string;
  startDelay?: number;
  color?: string;
}

export default function Caption({text, startDelay=5, color="secondary"}:Props) {

  // 1. Разбиваем строку на символы и заменяем обычные пробелы на неразрывные
  const chars = text.split("").map((char) =>
    char === " " ? "\u00A0" : char
  );

  return (
    <div className="flex flex-wrap gap-x-[0.15em] lg:gap-x-[0.2em] justify-center items-center w-full z-30">
      {chars.map((char, index) => (
        <motion.span
          key={index}
          className={`${font_caption.className} text-${color} tracking-widest text-md md:text-xl block min-w-[0.5em]`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            opacity: { duration: 0.6, delay: startDelay + index * 0.06 },
            y: { duration: 0.4, delay: startDelay + index * 0.06 },
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}
