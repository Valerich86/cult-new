"use client";

import { useState } from "react";
import Link from "next/link";
import { News } from "../../lib/data";
import ImageBlock from "../UI/image-block";
import TextBlock from "../UI/text-block";
import { font_caption } from "../../lib/fonts";
import PopupLink from "../UI/popup-link";
import { motion } from "framer-motion";
import Decor from "../UI/decor";
import AnimatedTitle from "../animation/title";
import VideoBlock from "../UI/video-block";
import GalleryItem from "../UI/gallery-item";

interface Props {
  news: News[];
  isPage?: boolean;
}

export default function NewsSection({ news, isPage = false }: Props) {
  return (
    <section id="news" className="w-full relative">
      <Decor />
      <div
        className={`w-full mb-40 flex justify-center xl:justify-start items-center`}
      >
        <AnimatedTitle text={"Есть новости"} />
      </div>
      <div className="w-full flex flex-wrap gap-x-10 gap-y-20 justify-between">
        {news?.map((item, index) => {
          const arrayContent = item.content.split(" ");
          const croppedArray = arrayContent.slice(0, 60);
          const isCropped = croppedArray.length < arrayContent.length;
          const [showFullText, setShowFullText] = useState(isCropped);
          let croppedContent = "";
          croppedArray.forEach((el) => {
            croppedContent += `${el} `;
          });
          croppedContent += isCropped ? "..." : "";
          return (
            <div
              key={item.id}
              id={item.id.toString()}
              className="w-full sm:w-[40%] xl:w-[30%]"
            >
              <motion.div
                className="w-full h-100 relative"
                initial={{ scale: 0.95 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 0.2 * index, duration: 0.3 }}
              >
                {item.media_type === "image" && (
                  <ImageBlock
                    src={item.media_url}
                    alt={`Изображение к новости ${item.media_url}`}
                  />
                )}
                {item.media_type === "video" && (
                  <VideoBlock src={item.media_url} shadow controls />
                )}
                <span className="absolute top-0 right-0 p-1 shadow  rotate-30">
                  {new Date(item.published_at).toLocaleDateString()}
                </span>
              </motion.div>
              <div className="w-full max-h-100">
                <motion.pre
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.3 }}
                  className={`whitespace-pre-wrap pt-5 text-sm`}
                >
                  {croppedContent}
                </motion.pre>
                {isCropped && (
                  <div className="w-full border relative mt-15">
                    <PopupLink
                      text="Читать полностью"
                      href={`/news/${item.id}?prevPage=${isPage ? `/news` : "/"}`}
                    />
                  </div>
                )}
                {item.link_href && (
                  <div className="w-full flex justify-end pr-5">
                    <Link
                      href={item.link_href}
                      target="_blank"
                      className={`${font_caption.className} sm:text-3xl text-xl xl:text-xl animate-pulse text-peachy2 mt-5`}
                    >
                      {item.link_name}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {!isPage && news.length && (
        <div className="w-full flex justify-center xl:justify-end sm:text-3xl xl:text-base mt-10">
          <span>
            Все новости{" "}
            <Link
              href={"/news"}
              className={`${font_caption.className} link animate-pulse`}
            >
              здесь
            </Link>
          </span>
        </div>
      )}
    </section>
  );
}
