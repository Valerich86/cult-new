"use client";

import { font_accent } from "@/lib/fonts";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  text: string;
}

type TitleItem = {
  char: string;
  height: number;
  position: "left" | "right";
};

const leftAnimated = [
  "А",
  "в",
  "г",
  "и",
  "й",
  "к",
  "м",
  "н",
  "Н",
  "П",
  "x",
  "ш",
  "ю",
];
const rightAnimated = ["л", "п", "ч", "Ч", "щ", "ы", "я"];

export default function AnimatedTitle({ text }: Props) {
  const maxHeight = 20;
  const minHeight = 1;
  const [items, setItems] = useState<TitleItem[]>([]);

  useEffect(() => {
    const chars = text
      .split("")
      .map((char) => (char === " " ? "\u00A0" : char));
    let newItems: TitleItem[] = [];
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      const isAnimated = [leftAnimated, rightAnimated].some((arr) =>
        arr.includes(char),
      );
      const position = leftAnimated.includes(char) ? "left" : "right";
      newItems.push({
        char: chars[i],
        height: isAnimated ? Math.random() * maxHeight + minHeight : 0,
        position: position,
      });
    }
    setItems(newItems);
  }, []);

  return (
    <div className="flex flex-wrap w-full justify-center xl:justify-start z-30">
      {items.map((item, index) => {
        return (
          <div
            key={index}
            className={`${font_accent.className} relative text-brown text-3xl sm:text-7xl xl:text-5xl`}
          >
            {item.char}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${item.height}vh` }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{
                duration: item.height + Math.random() * item.height,
                delay: index + 3,
                ease: "easeOut",
              }}
              className={`w-0.5 bg-linear-to-b from-brown/50 via-90% via-brown to-black 
                rounded-b-full absolute top-6.5 sm:top-13 xl:top-8.75 ${item.position}-0`}
            />
          </div>
        );
      })}
    </div>
  );
}
