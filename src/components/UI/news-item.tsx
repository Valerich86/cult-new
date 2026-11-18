"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import type { News } from "../../lib/data";
import ImageBlock from "./image-block";
import TextBlock from "./text-block";
import { font_caption } from "../../lib/fonts";
import VideoBlock from "./video-block";

interface Props {
  newsItem: News;
}

export default function NewsItem({ newsItem }: Props) {
  return (
    <div className="w-full flex flex-col xl:flex-row gap-5 items-stretch">
      <motion.div
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 15,
        }}
        className="w-full xl:w-1/2 h-[50vh] xl:h-[90vh] relative"
      >
        {newsItem.media_type === "image" && (
          <ImageBlock
            src={newsItem.media_url}
            alt={`Изображение к новости ${newsItem.media_url}`}
          />
        )}
        {newsItem.media_type === "video" && (
          <VideoBlock src={newsItem.media_url} shadow controls />
        )}
        <span className="absolute w-fit h-fit inset-0 py-1 px-3 shadow bg-secondary/40 -rotate-30">
          {new Date(newsItem.published_at).toLocaleDateString()}
        </span>
      </motion.div>
      <div className={`w-full xl:w-1/2`}>
        <TextBlock
          text={newsItem.content}
          animType="fromRight"
          options="bg-transparent text-brown text-sm"
        />
        {newsItem.link_href && (
          <div className="w-full flex justify-end pr-5">
            <Link
              href={newsItem.link_href}
              target="_blank"
              className={`${font_caption.className} text-xl animate-pulse text-peachy2`}
            >
              {newsItem.link_name}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
