"use client";

import { photoComposition } from "@/lib/utils";
import VideoBlock from "../UI/video-block";
import Image from "next/image";
import Caption from "../animation/caption";
import Decor from "../UI/decor";

export default function LivingTattooSection() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative" id="living">
      <Decor />
      <div className="w-full h-[90%] sm:w-2/3 lg:w-1/2 bg-primary relative">
        <div className="w-full h-full">
          <VideoBlock src="/tech/lion.webm" />
        </div>
        <div className="absolute w-full flex justify-center left-0 bottom-15">
          <Caption
            startDelay={0}
            text={`Он как живой...`}
            color="secondary"
          />
        </div>
      </div>
    </div>
  );
}
