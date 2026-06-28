"use client";

import { font_accent, font_caption } from "@/lib/fonts";
import ImageBlock from "../UI/image-block";
import { motion } from "framer-motion";
import Link from "next/link";
import PopupLink from "../UI/popup-link";

export default function Section3({gallery}:{gallery:any}) {
  return (
    <>
      <div className="grid gap-4 grid-cols-1 h-[200vh] lg:h-screen lg:grid-cols-2 grid-rows-4 lg:grid-rows-2 mt-4" id="masters">
        <div className={`col-span-1 row-span-1 ${font_accent.className} text-6xl flex items-center justify-center lg:justify-start`}>
          Наши мастера
        </div>
        <div className="col-span-1 row-span-1 relative bg-primary" id="tan">
          <ImageBlock src={"/tech/tan.png"} position="10% 60%"/>
          <span className="master-name">Андрей</span>
          <PopupLink href={"/info/tan"}/>
        </div>
        <div className="col-span-1 row-span-1 relative bg-primary" id="sonya">
          <ImageBlock src={"/tech/sonya.png"} position={"10% 40%"}/>
          <span className="master-name">Соня</span>
          <PopupLink href={"/info/sonya"}/>
        </div>
        <div className="col-span-1 row-span-1 relative bg-primary" id="arthur">
          <ImageBlock src={"/tech/arthur.png"} position="10% 25%"/>
          <span className="master-name">Артур</span>
          <PopupLink href={"/info/arthur"}/>
        </div>
      </div>
    </>
  );
}
