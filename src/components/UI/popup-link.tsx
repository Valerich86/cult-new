"use client";

import { font_caption } from "../../lib/fonts";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Spinner from "./spinner";

interface Props {
  href: string;
  text?: string;
  blank?: boolean;
}

export default function PopupLink({
  href,
  text = "Подробнее",
  blank = false,
}: Props) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      whileInView={{ height: 50, opacity: 0.9 }}
      viewport={{ once: false, amount: 0.6 }}
      transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
      className="w-full flex justify-center items-center bg-brown absolute bottom-0 left-0 shadow-xs"
    >
      <Link
        href={href}
        target={blank ? "_blank" : "_self"}
        
        className={`${font_caption.className} ${!isClicked && "animate-pulse link"} text-secondary`}
        onClick={() => setIsClicked(true)}
        style={{
          pointerEvents: isClicked ? 'none' : 'auto',
          opacity: isClicked ? 0.6 : 1,
          cursor: isClicked ? 'not-allowed' : 'pointer',
        }}
      >
        {isClicked ? <Spinner /> : text}
      </Link>
    </motion.div>
  );
}
