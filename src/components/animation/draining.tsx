"use client";

import { useEffect, useState } from "react";
import { delay, motion } from "framer-motion";

interface Props {
  length?: number;
  maxHeight?: 100 | 200 | 300| 500 | 700;
}

export default function Draining({length=10, maxHeight=200}:Props) {
  const [items, setItems] = useState<
    {
      height: number;
      width: number;
      duration: number;
      delay: number;
    }[]
  >([]);

  useEffect(() => {
    const newItems = Array.from({ length: length }, (_, i) => ({
      height: i % 2 === 0 || i % 5 === 0 ? 0 : Math.random() * maxHeight + 100,
      width: 7 + Math.random() * 20,
      duration: 100 + Math.random() * 200,
      delay: Math.random() * 50,
    }));

    setItems(newItems);
  }, []);

  if (items.length === 0) return <></>;

  return (
    <div className="absolute left-0 top-0 w-full z-20">
      <div className="flex justify-around absolute w-full top-0">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${item.height}vh` }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              ease: "easeOut",
            }}
            style={{ width: `${item.width}px` }}
            className="bg-linear-to-b from-brown to-primary rounded-b-full relative"
          >
            
          </motion.div>
        ))}
      </div>
    </div>
  );
}
