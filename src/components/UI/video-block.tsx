"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

interface VideoContainerProps {
  src: string;
}

export default function VideoBlock({ src }:VideoContainerProps) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    const video = ref.current;
    let timer;
    if (isInView && video) {
      timer = setTimeout(() => {
        video?.play().catch(console.warn);
        video.playbackRate = 0.4;
      }, 5000);
    } else {
      video?.load();
      video?.pause();
      clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <motion.video
      ref={ref}
      className={`object-contain`}
      muted
      playsInline
    >
      <source src={src} type="video/mp4" />
    </motion.video>
  );
}