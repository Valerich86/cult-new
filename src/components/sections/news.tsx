"use client";

import { useState } from "react";
import Link from "next/link";
import { News } from "@/lib/data";
import ImageBlock from "../UI/image-block";
import TextBlock from "../UI/text-block";
import { font_accent, font_caption } from "@/lib/fonts";
import PopupLink from "../UI/popup-link";
import Decor from "../UI/decor";

interface Props {
  news: News[];
}

export default function NewsSection({ news }:Props) {
  return (
    <section id="news" className="w-full flex flex-col gap-10">
      {news &&
        news.map((item) => {
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
              id={item.id}
              className="w-full flex flex-col lg:flex-row gap-5 items-stretch relative"
            >
              <Decor />
              <div className="w-full lg:w-1/2 flex items-center flex-col">
                <div
                  className={`w-full flex ${font_accent.className} text-5xl sm:text-6xl min-h-[50vh] items-center`}
                >
                  {item.title}
                </div>
                <TextBlock
                  text={croppedContent}
                  options="bg-secondary text-brown"
                />
                {isCropped && (
                  <div className="w-full border relative mt-15">
                    <PopupLink text="Читать полностью" href={`/news/${item.id}`}/>
                  </div>
                )}
                {item.link_href && (
                  <div className="w-full flex justify-end pr-5">
                    <Link
                      href={item.link_href} target="_blank"
                      className={`${font_caption.className} text-xl animate-pulse text-peachy2 mt-5`}
                    >
                      {item.link_name}
                    </Link>
                  </div>
                )}
              </div>
              <div className="w-full lg:w-1/2 flex flex-col justify-stretch">
                <div className="w-full min-h-[90vh]">
                  {item.media_type === "image" && (
                    <ImageBlock
                      src={item.media_url}
                      alt={`Изображение к новости ${item.media_url}`}
                      position="top"
                    />
                  )}
                  {item.media_type === "video" && (
                    <video
                      className="object-cover h-full w-full grayscale-90"
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
            </div>
          );
        })}
    </section>
  );
}
