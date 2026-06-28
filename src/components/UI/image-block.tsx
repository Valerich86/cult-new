"use client";

import Image from "next/image";

interface Props {
  src: string;
  alt?: string;
  position?: string;
  options?: string;
}

export default function ImageBlock({
  src,
  alt = "",
  position = "right",
  options = "",
}: Props) {
  return (
    <div className={`w-full h-full relative overflow-hidden ${options}`}>
      <Image
        src={src}
        alt={alt}
        loading="eager"
        fill
        objectPosition={position}
        className={`object-cover transition duration-2000 hover:scale-105 grayscale-80`}
      />
    </div>
  );
}
