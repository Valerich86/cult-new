"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Hero() {
  const [isAnimated, setIsAnimated] = useState(false);

  return (
    <motion.div className="w-screen h-screen overflow-hidden">
      <div
        className={`${isAnimated ? "animate-alternativeBG" : "animate-logoShiningBG"} opacity-80 absolute top-0 left-0 w-full h-full flex justify-center items-center overflow-hidden`}
      >
        <Image
          id="logo-BG"
          src="/tech/logo-BG-2.webp"
          alt=""
          loading="eager"
          priority
          width={200}
          height={400}
          style={{ objectFit: "contain", height: "auto", width: "100%" }}
        />
      </div>
      <div
        className={`${isAnimated ? "animate-none" : "animate-logoShiningFG"} opacity-5 absolute top-0 left-0 w-full h-full flex justify-center items-center overflow-hidden`}
      >
        <Image
          id="logo-FG"
          src="/tech/logo-FG-2.webp"
          loading="eager"
          priority
          alt=""
          width={200}
          height={400}
          style={{ objectFit: "contain", height: "auto", width: "100%" }}
        />
      </div>
    </motion.div>
  );
}