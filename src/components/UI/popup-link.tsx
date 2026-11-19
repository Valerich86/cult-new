"use client";

import Link from "next/link";
import { useLinkStatus } from "next/link";
import { font_caption } from "../../lib/fonts";
import { motion } from "framer-motion";
import Spinner from "./spinner";

interface Props {
  href: string;
  text?: string;
  blank?: boolean;
}

function LinkInner({ text, className }: { text: string; className: string }) {
  const { pending } = useLinkStatus();

  return (
    <span
      className={`${className} ${!pending && "animate-pulse link"}`}
      style={{
        pointerEvents: pending ? "none" : "auto",
        opacity: pending ? 0.6 : 1,
        cursor: pending ? "not-allowed" : "pointer",
      }}
    >
      {pending ? <Spinner /> : text}
    </span>
  );
}

export default function PopupLink({
  href,
  text = "Подробнее",
  blank = false,
}: Props) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      whileInView={{ height: 50, opacity: 0.9 }}
      viewport={{ once: false, amount: 0.6 }}
      transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
      className="w-full flex justify-center items-center bg-brown absolute bottom-0 left-0 shadow-xs"
    >
      <Link href={href} target={blank ? "_blank" : "_self"}>
        <LinkInner
          text={text}
          className={`${font_caption.className} text-secondary`}
        />
      </Link>
    </motion.div>
  );
}
