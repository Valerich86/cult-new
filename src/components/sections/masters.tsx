"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ImageBlock from "../UI/image-block";
import PopupLink from "../UI/popup-link";
import { photoComposition, masters } from "../../lib/utils";
import Decor from "../UI/decor";
import AnimatedTitle from "../animation/title";

type Gallery = {
  tan: string[];
  sonya: string[];
  arthur: string[];
};

interface Props {
  gallery: Gallery;
  cloudPath: string;
}

export default function MastersSection({ gallery, cloudPath }: Props) {
  const PhotoContainer = ({
    images,
    interval = 3000,
  }: {
    images: string[];
    interval?: number;
  }) => {
    const [curIndex, setCurIndex] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setCurIndex((prev) => (prev !== 4 ? prev + 1 : 0));
      }, interval);

      return () => clearInterval(timer);
    }, []);

    return (
      <div className={`relative rounded-full h-full w-full`}>
        {photoComposition.map((pos, i) => (
          <div
            key={i}
            className={`absolute w-60 h-60 sm:w-80 sm:h-80 xl:w-60 xl:h-60 ${pos}`}
          >
            <Image
              src={images[i]}
              alt={`Фото тату "${images[i]}"`}
              width={300}
              height={300}
              loading="lazy"
              style={{ opacity: curIndex === i ? 1 : 0 }}
              className={`object-cover h-full w-full object-center grayscale-80 transition-all duration-1000 shadow`}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-40 mt-40">
      <div
        className={`flex flex-wrap justify-center xl:justify-start items-center `}
      >
        <AnimatedTitle text="Наши мастера" />
      </div>
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
          <section
            key={index}
            className="p-5 grid gap-4 grid-cols-1 h-[200vh] xl:h-screen xl:grid-cols-2 grid-rows-4 xl:grid-rows-2 relative bg-[url('/tech/wall.webp')] bg-no-repeat bg-cover shadow"
            id={master.id}
          >
            <Decor />
            <div
              className={`col-span-1 row-span-1 flex items-center justify-center xl:justify-start`}
            >
              <AnimatedTitle text={master.name} colorStyle="text-secondary" />
            </div>
            <div className="col-span-1 row-span-1">
              <PhotoContainer images={images.slice(0, images.length / 2)} />
            </div>
            <div className="col-span-1 row-span-1">
              <PhotoContainer
                images={images.slice(images.length / 2, images.length)}
                interval={1700}
              />
            </div>
            <div className="col-span-1 row-span-1 border-b-2 border-brown relative overflow-hidden">
              <div className="w-100 h-100 absolute inset-0 bg-peachy1 rounded-full"></div>
              <ImageBlock
                src={`${cloudPath}/tech/masters-${master.id}.png`}
                position={
                  master.id === "tan"
                    ? "10% 60%"
                    : master.id === "sonya"
                      ? "10% 35%"
                      : "10% 20%"
                }
                bgStyle="bg-transparent"
                priority
                shadowLess
              />
              <PopupLink href={`/info/${master.id}`} />
            </div>
          </section>
        );
      })}
    </div>
  );
}
