"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { useInView } from "framer-motion"; 

interface VideoContainerProps {
  src: string;
}

export default function VideoBlock({ src }: VideoContainerProps) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const isInView = useInView(ref, { amount: 0.3 });
  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let timer: NodeJS.Timeout | null = null;

    if (isInView) {
      timer = setTimeout(() => {
        video.play().catch(console.warn);
        video.playbackRate = 0.7;
      }, 2000);
    } else {
      if (timer) clearTimeout(timer);
      video.pause();
      video.currentTime = 0;
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isInView]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 0.5 : 0 }}
      transition={{ 
        duration: 1, 
      }}
      className="w-full h-full overflow-hidden shadow-[0px_0px_5px_1px_black]"
    >
      <motion.video
        ref={ref}
        className="object-cover h-full w-full grayscale-90 pointer-events-none"
        muted
        playsInline
        controls={false}
      >
        <source src={src} />
      </motion.video>
    </motion.div>
  );
}
