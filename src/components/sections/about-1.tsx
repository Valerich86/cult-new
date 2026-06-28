"use client";

import { motion } from "framer-motion";
import TextBlock from "../UI/text-block";
import ImageBlock from "../UI/image-block";
import { cult1, cult2 } from "@/lib/text";
import { font_accent } from "@/lib/fonts";

export default function AboutSection1() {
  return (
    <>
      <div className="grid grid-cols-1 h-[300vh] lg:h-screen lg:grid-cols-2 grid-rows-6 lg:grid-rows-2">
        <div className="col-span-1 row-span-2 lg:row-span-1">
          <TextBlock text={cult1} />
        </div>
        <div className="col-span-1 row-span-1">
          <ImageBlock src={"/tech/bg-desktop.jpg"} />
        </div>
        <div className="col-span-1 row-span-2 lg:row-span-1 lg:hidden">
          <TextBlock
            text={cult2}
            options="bg-brown text-secondary"
            translateLeft
          />
        </div>
        <div className="col-span-1 row-span-1">
          <ImageBlock src={"/tech/studio.webp"} />
        </div>
        <div className="col-span-1 row-span-2 lg:row-span-1 hidden lg:flex">
          <TextBlock
            text={cult2}
            options="bg-secondary text-primary"
            translateLeft
          />
        </div>
      </div>
    </>
  );
}
