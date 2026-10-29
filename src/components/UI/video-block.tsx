"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface VideoContainerProps {
  src: string;
  shadow?: boolean;
  loop?: boolean;
  controls?: boolean;
  autoplay?: boolean;
  normalRate?: boolean;
}

export default function VideoBlock({
  src,
  shadow = false,
  loop = false,
  controls = false,
  autoplay = false,
  normalRate = false,
}: VideoContainerProps) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Автовоспроизведение при появлении в области видимости (если не автоплей)
  useEffect(() => {
    const video = ref.current;
    if (!video || autoplay) return;

    let timer: NodeJS.Timeout | null = null;

    if (isInView) {
      timer = setTimeout(() => {
        video.play().catch(console.warn);
        video.playbackRate = normalRate ? 1 : 0.7;
      }, 2000);
    } else {
      if (timer) clearTimeout(timer);
      video.pause();
      video.currentTime = 0;
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isInView, autoplay]);

  // Синхронизируем наш стейт с реальным fullscreen браузера
  useEffect(() => {
    const handleFullscreenChange = () => {
      const nowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(nowFullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    // Проверяем сразу, вдруг уже в fullscreen
    handleFullscreenChange();

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div
      className={`
        relative w-full h-full overflow-hidden
        ${shadow && !isFullscreen && "shadow"}
      `}
    >
      <motion.video
        ref={ref}
        className={`
          ${isFullscreen ? "object-contain" : "object-cover"} w-full h-full
          ${!controls && "pointer-events-none select-none"}
          grayscale-90
        `}
        muted
        playsInline
        autoPlay={autoplay}
        loop={loop}
        controls={controls}
      >
        <source src={src} type="video/mp4" />
      </motion.video>
    </div>
  );
}
