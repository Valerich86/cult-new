"use client";

import { font_caption } from "@/lib/fonts";
import { REVIEWS_HREF } from "@/lib/temp";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Props {
  text: string;
  vkHref?: string;
  maxLines?: number;
}

export default function TruncatedText({ text, vkHref, maxLines=6 }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // line-height в пикселях (берём из computed style)
    const style = window.getComputedStyle(el);
    const lineHeight = parseFloat(style.lineHeight) || 1.2 * 14; // запасной вариант для text-xs
    const maxHeight = lineHeight * maxLines;

    setIsTruncated(el.scrollHeight > el.offsetHeight);
  }, [text, maxLines]);

  return (
    <div className="flex flex-col gap-2">
      <p
        ref={ref}
        className={`text-base xl:text-xs overflow-hidden 
          line-clamp-${maxLines} [--line-clamp:${maxLines}]
        `}
      >
        {text}
      </p>

      {vkHref && (
        <Link
          href={vkHref}
          target={"_blank"}
          className={`${font_caption.className} animate-pulse text-lg text-right`}
        >
          {showFull ? "Свернуть" : "Читать полностью"}
        </Link>
      )}
    </div>
  );
}
