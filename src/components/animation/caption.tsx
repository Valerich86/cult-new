"use client";

import { motion } from "framer-motion";
import { font_caption } from "@/lib/fonts";

export default function Caption() {
  const caption = "Студия татуировки. Пермь";

  // 1. Разбиваем строку на символы и заменяем обычные пробелы на неразрывные
  const chars = caption.split("").map((char) =>
    char === " " ? "\u00A0" : char
  );

  return (
    <div className="flex flex-wrap gap-x-[0.15em] lg:gap-x-[0.2em] justify-center items-center absolute w-[90vw] z-30 left-1/2 -translate-x-1/2 top-[55vh] sm:top-[30vh]">
      {chars.map((char, index) => (
        <motion.span
          key={index}
          className={`${font_caption.className} text-secondary tracking-widest text-md md:text-xl block min-w-[0.5em]`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            opacity: { duration: 0.6, delay: 5 + index * 0.06 },
            y: { duration: 0.4, delay: 5 + index * 0.06 },
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}
