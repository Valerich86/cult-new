"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  src: string;
  alt?: string;
  position?: string;
  options?: string;
  priority?: boolean;
}

export default function ImageBlock({
  src,
  alt = "",
  position = "right",
  options = "",
  priority = false
}: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={`w-full h-full relative overflow-hidden ${options}`}>
      {!isLoaded && (
        <div className="absolute inset-0 w-full h-full flex justify-center items-center">
          <div className="w-10 h-10 rounded-full border-b-3 border-secondary animate-spin"></div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        loading="eager"
        fill
        priority={priority}
        objectPosition={position}
        className={`object-cover transition duration-2000 hover:scale-105 grayscale-80`}
        onLoadingComplete={() => setIsLoaded(true)}
      />
    </div>
  );
}
