'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

export default function HeroAnimation() {
  const [animation, setAnimation] = useState<"intro"|"infinite">("intro");

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimation("infinite");
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div
        className={
          `${animation === "intro" ? "animate-logoShiningBG" : "animate-bg"} opacity-80 absolute inset-0 w-full h-full flex justify-center items-center overflow-hidden`
        }
      >
        <Image
          id="logo-BG"
          src="/tech/logo-BG-2.webp"
          alt="Логотип А"
          loading="eager"
          priority
          width={200}
          height={400}
          style={{ objectFit: "contain", height: "auto", width: "100%" }}
        />
      </div>
      <div
        className={`animate-logoShiningFG absolute inset-0 w-full h-full flex justify-center items-center overflow-hidden`}
      >
        <Image
          id="logo-FG"
          src="/tech/logo-FG-2.webp"
          loading="eager"
          priority
          alt="Логотип Б"
          width={200}
          height={400}
          style={{ objectFit: "contain", height: "auto", width: "100%" }}
        />
      </div>
    </div>
  );
}