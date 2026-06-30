'use client';

import { useEffect, useState } from "react";

type Stripe = {
  id: number;
  lengthPercent: number;
  rotation: number;
  x: number;
  y: number;
};

export default function Decor() {
  const [stripes, setStripes] = useState<Stripe[]>([]);

  useEffect(() => {
    const generateStripes = () => {
      const count = 5;
      const newStripes = [];

      for (let i = 0; i < count; i++) {
        // Длина полоски в процентах от экрана (от 15% до 60%)
        const lengthPercent = Math.random() * 45 + 15;

        // Угол поворота в градусах (от -90 до 90)
        const rotation = Math.random() * 180 - 90;

        // Позиция центра полоски: x и y в процентах
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        newStripes.push({
          id: i,
          lengthPercent,
          rotation,
          x,
          y,
        });
      }

      setStripes(newStripes);
    };

    generateStripes();
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
      {stripes.map((stripe) => (
        <div
          key={stripe.id}
          className={`absolute border border-peachy1 rounded-full origin-center`}
          style={{
            width: `${stripe.lengthPercent}%`,
            left: `${stripe.x}%`,
            top: `${stripe.y}%`,
            transform: `translate(-50%, -50%) rotate(${stripe.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}
