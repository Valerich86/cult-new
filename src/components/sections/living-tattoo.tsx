"use client";

import { photoComposition } from "@/lib/utils";
import VideoBlock from "../UI/video-block";

export default function LivingTattooSection() {
  return (
    <>
      <div className="h-screen w-full flex justify-end items-center">
        <div className="w-1/2 h-full relative">
        {photoComposition.map((pos, i) => (
          <div key={i} className={`${pos} absolute w-60 h-60`}>
            <VideoBlock src="/tech/monster-1.webm"/>
          </div>
        ))}
        </div>
      </div>
    </>
  );
}
