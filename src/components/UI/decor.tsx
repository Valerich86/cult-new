"use client";

import { useEffect, useState } from "react";

type Circle = {
  id: number;
  size: number;
  x: number;
  y: number;
};

interface Props {
  count?: number;
}

export default function Decor({ count = 5 }: Props) {
  const [circles, setCircles] = useState<Circle[]>([]);

  useEffect(() => {
    const generateCircles = () => {
      const newCircles = [];

      for (let i = 0; i < count; i++) {
        const size = Math.random() * 550 + 50;
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        newCircles.push({
          id: i,
          size,
          x,
          y,
        });
      }

      setCircles(newCircles);
    };

    generateCircles();
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full -z-10">
      {circles.map((c, i) => (
        <div
          key={c.id}
          className={`absolute border border-peachy1 rounded-full origin-center`}
          style={{
            width: `${c.size}px`,
            height: `${c.size}px`,
            left: `${c.x}%`,
            top: `${c.y}%`,
            transform: `translate(-50%, -50%)`
          }}
        />
      ))}
    </div>
  );
}
