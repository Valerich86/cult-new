"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ImageBlock from "../UI/image-block";
import PopupLink from "../UI/popup-link";
import { font_accent } from "@/lib/fonts";
import { photoComposition, masters } from "@/lib/utils";

type Gallery = {
  tan: string[];
  sonya: string[];
  arthur: string[];
};

export default function MastersSection({ gallery }: { gallery: Gallery }) {
  const PhotoContainer = ({
    images,
    interval = 4000,
  }: {
    images: string[];
    interval?: number;
  }) => {
    const [curIndex, setCurIndex] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setCurIndex((prev) => (prev !== 4 ? prev + 1 : 0));
      }, interval);
    }, []);

    return (
      <div className="h-full w-full overflow-x-hidden relative">
        {photoComposition.map((pos, i) => (
          <div key={i} className={`absolute w-60 h-60 ${pos}`}>
            <Image
              src={images[i]}
              alt={`Фото тату "${images[i]}"`}
              width={300}
              height={300}
              loading="lazy"
              style={{ opacity: curIndex === i ? 1 : 0 }}
              className={`object-contain h-full w-full object-center grayscale-80 transition-all duration-2000`}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {masters.map((master, index) => {
        let images: string[] = [];
        switch (master.name) {
          case "Андрей":
            images = gallery.tan;
            break;
          case "Соня":
            images = gallery.sonya;
            break;
          case "Артур":
            images = gallery.arthur;
            break;
        }

        return (
          <div
            key={index}
            className="grid gap-4 grid-cols-1 h-[200vh] lg:h-screen lg:grid-cols-2 grid-rows-4 lg:grid-rows-2"
            id="masters"
          >
            <div
              className={`col-span-1 row-span-1 ${font_accent.className} text-5xl lg:text-6xl flex items-center justify-center lg:justify-start`}
            >
              {master.name}
            </div>
            <div className="col-span-1 row-span-1">
              <PhotoContainer
                images={images.slice(0, images.length / 2)}
              />
            </div>
            <div className="col-span-1 row-span-1" id="sonya">
              <PhotoContainer
                images={images.slice(images.length / 2, images.length)}
                interval={5000}
              />
            </div>
            <div
              className="col-span-1 row-span-1 border-r-2 border-b-2 border-brown relative"
              id="arthur"
            >
              <ImageBlock
                src={`/tech/${master.folder}.png`}
                position={master.folder !== "tan" ? "10% 25%" : "10% 60%"}
                options="bg-secondary"
              />
              <PopupLink href={"/info/tan"} />
            </div>
          </div>
        );
      })}
    </>
  );
}
