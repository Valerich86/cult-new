"use client";

import TextBlock from "../UI/text-block";
import ImageBlock from "../UI/image-block";
import { cult1, cult2 } from "../../lib/text";
import Decor from "../UI/decor";

export default function AboutSection1({ cloudPath }: { cloudPath: string }) {
  return (
    <div className="grid grid-cols-1 h-[200vh] xl:h-screen xl:grid-cols-2 grid-rows-4 xl:grid-rows-2 relative">
      <Decor />
      <div className="col-span-1 row-span-1">
        <TextBlock text={cult1} />
      </div>
      <div className="col-span-1 row-span-1">
        <ImageBlock src={`${cloudPath}/tech/about-1.webp`} />
      </div>
      <div className="col-span-1 row-span-1 xl:hidden">
        <TextBlock
          text={cult2}
        />
      </div>
      <div className="col-span-1 row-span-1">
        <ImageBlock src={`${cloudPath}/tech/about-2.webp`} />
      </div>
      <div className="col-span-1 row-span-1 hidden xl:flex">
        <TextBlock
          text={cult2}
          options="px-5 bg-transparent text-brown"
        />
      </div>
    </div>
  );
}
