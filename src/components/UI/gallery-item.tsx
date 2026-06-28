"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

interface ImageContainerProps {
  src: string;
  optionalStyles?: string;
  index: number;
  position?: string;
  rotate?: number;
  delay?: number;
  border?: boolean;
  animateOnce?: boolean;
  containerId: string;
}

export default function GalleryItem({
  src,
  index,
  optionalStyles,
  delay = 0,
  border = true,
  animateOnce = true,
  rotate = Math.floor(Math.random() * 20) - 10,
  containerId,
}: ImageContainerProps) {
  const [fullscreen, setFullscreen] = useState(false);
  const [rotation, setRotation] = useState(rotate);
  const [curDelay, setCurDelay] = useState(delay);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );

  const showCloser = () => {
    const container = document.getElementById(containerId);
    if (container) {
      if (!fullscreen) container.style.overflow = "hidden";
      else container.style.overflow = "";
    }
    setFullscreen(!fullscreen);
    setCurDelay(0);
    setRotation(rotation === 0 ? rotate : 0);
  };

  return (
    <motion.div
      className={`w-full h-full flex justify-center relative
        ${fullscreen ? "cursor-zoom-out" : "cursor-zoom-in"} 
        ${status === "loading" || status === "error" ? "hidden" : ""}
        ${border ? "border-4 border-primary bg-primary shadow-2xl shadow-black" : ""} 
        ${optionalStyles}`}
      onClick={showCloser}
      initial={{ x: 50, opacity: 0, scale: 1.05 }}
      whileInView={{ x: 0, opacity: 1, scale: 1 }}
      viewport={{ once: animateOnce, amount: 0.4 }}
      animate={{
        width: fullscreen ? "100vw" : "",
        height: fullscreen ? "100vh" : "",
        position: fullscreen ? "fixed" : "",
        zIndex: fullscreen ? 60 : "",
        top: fullscreen ? 0 : "",
        left: fullscreen ? 0 : "",
      }}
      transition={{ duration: 0.1 }}
      style={{ rotate: rotation }}
    >
      <Image
        src={src}
        alt={`Фото URL=${src}`}
        width={400}
        height={300}
        loading="eager"
        className={`${fullscreen ? "object-contain" : "object-cover"} h-full w-full object-center grayscale-80 `}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
      />
      {!fullscreen && <div className="absolute inset-0 bg-black/30" />}
      {fullscreen && (
        <div className="absolute top-10 left-10 w-full">
          <img src={"/tech/logo.png"} alt="logo" width={100} height={100}></img>
        </div>
      )}
    </motion.div>
  );
}
