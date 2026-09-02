"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  length?: number;
  maxHeight?: number;
}

export default function Draining({ length = 5, maxHeight = 100 }: Props) {
  const [items, setItems] = useState<
    {
      height: number;
      width: number;
      delay: number;
    }[]
  >([]);

  useEffect(() => {
    const newItems = Array.from({ length: length }, (_, i) => ({
      height: i % 2 === 0 || i % 5 === 0 ? 0 : Math.random() * maxHeight + 20,
      width: 5 + Math.random() * 10,
      delay: 10 + Math.random() * 30,
    }));

    setItems(newItems);
  }, []);

  if (items.length === 0) return <></>;

  return (
    <div className="absolute left-0 -top-10 w-full z-20">
      <div className="flex justify-around absolute w-full top-0">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${item.height}vh` }}
            transition={{
              duration: item.height + Math.random() * item.height,
              delay: item.delay,
              ease: "easeOut",
            }}
            style={{ width: `${item.width}px` }}
            className="bg-linear-to-b from-transparent via-90% via-brown to-black rounded-b-full relative"
          ></motion.div>
        ))}
      </div>
    </div>
  );
}
