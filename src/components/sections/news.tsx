"use client";

import { useState } from "react";
import Link from "next/link";
import { News } from "@/lib/data";
import ImageBlock from "../UI/image-block";
import TextBlock from "../UI/text-block";
import { font_accent, font_caption } from "@/lib/fonts";
import PopupLink from "../UI/popup-link";
import Decor from "../UI/decor";
import AnimatedTitle from "../animation/title";

interface Props {
  news: News[];
  isPage?: boolean;
}

export default function NewsSection({ news, isPage = false }: Props) {
  return (
    <section id="news" className="w-full flex flex-col gap-10">
      {news?.map((item) => {
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
            className="w-full flex flex-col xl:flex-row gap-5 items-stretch justify-stretch relative"
          >
            <Decor />
            <div className="w-full xl:w-1/2 flex items-center flex-col">
              <div
                className={`w-full flex min-h-[40vh] justify-center xl:justify-start items-center`}
              >
                <AnimatedTitle text={item.title}/>
              </div>
              <TextBlock
                text={croppedContent}
                options="bg-transparent text-brown"
              />
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
            <div className="w-full xl:w-1/2 h-[90vh] xl:flex-1">
              {item.media_type === "image" && (
                <ImageBlock
                  src={item.media_url}
                  alt={`Изображение к новости ${item.media_url}`}
                  position="top"
                />
              )}
              {item.media_type === "video" && (
                <video
                  className="object-cover h-full w-full grayscale-90 pointer-events-none"
                  muted
                  autoPlay
                  playsInline
                  loop
                >
                  <source src={item.media_url} />
                </video>
              )}
            </div>
          </div>
        );
      })}
      {!isPage && news.length && (
        <div className="w-full flex justify-center xl:justify-end sm:text-3xl xl:text-base">
          <span>Все новости <Link href={"/news"} className={`${font_caption.className} link animate-pulse`}>здесь</Link></span>
        </div>
      )}
    </section>
  );
}
