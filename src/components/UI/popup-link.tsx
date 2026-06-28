"use client";

import { font_caption } from "@/lib/fonts";
import { motion } from "framer-motion";
import Link from "next/link";

interface Props {
  href: string;
  text?: string;
  blank?: boolean;
}

export default function PopupLink({ href, text="Подробнее", blank=false }: Props) {
  return (
    <motion.div
      initial={{ height: 0 }}
      whileInView={{ height: 50 }}
      viewport={{ once: false, amount: 0.6 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full flex justify-center items-center bg-brown opacity-80 absolute bottom-0 left-0"
    >
      <Link href={href} target={blank ? "_blank" : "_self"} className={`${font_caption.className} link text-secondary text-sm`}>
        {text}
      </Link>
    </motion.div>
  );
}
