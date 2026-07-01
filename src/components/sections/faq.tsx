"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AiOutlineUp } from "react-icons/ai";
import { font_accent } from "@/lib/fonts";
import { faq } from "@/lib/text";
import { useState } from "react";
import ImageBlock from "../UI/image-block";

export default function FaqSection({ cloudPath }: { cloudPath: string }) {
  const [visibleAnswer, setVisibleAnswer] = useState<Number | null>(null);
  return (
    <div
      className="w-full flex flex-col lg:flex-row bg-primary text-secondary mt-20 lg:mt-0"
      id="faq"
    >
      <div className="h-[90vh] w-full lg:w-1/2">
        <div
          className={`${font_accent.className} h-[40%]
        text-4xl sm:text-5xl lg:text-6xl flex items-center justify-center lg:justify-start px-4`}
        >
          Часто задаваемые вопросы
        </div>
        <div className="h-[60%] flex flex-col justify-between">
          {faq.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() =>
                  setVisibleAnswer(visibleAnswer === index ? null : index)
                }
                className={`${index !== faq.length - 1 ? "border-b" : ""} font-bold text-sm border-secondary h-1/5 flex justify-between items-end pb-2 relative px-4 cursor-pointer`}
              >
                <p className="pr-2">{item.question}</p>
                <div
                  className={`link ${visibleAnswer !== index ? "rotate-180" : ""} transition duration-200`}
                >
                  <AiOutlineUp size={15} />
                </div>
                <div
                  className={`absolute top-full left-0 flex transition-all duration-300 
                bg-peachy1 text-brown shadow-sm shadow-secondary z-10 p-5 text-xs w-full
                ${visibleAnswer === index ? "translate-y-0 opacity-100 scale-y-100" : "-translate-y-20 opacity-0 scale-y-0"}`}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-[90vh] w-full lg:w-1/2 relative">
        <ImageBlock
          src={`${cloudPath}/tech/faq-1.webp`}
          alt={"Фото к секции FAQ"}
          position="top"
        />
      </div>

      {/* <div className="col-span-1 row-span-2 relative lg:hidden">
        <Image
          src={`${cloudPath}/tech/faq-1.webp`}
          alt={"Задний фон секции FAQ"}
          loading="eager"
          fill
          className={`object-cover grayscale-80`}
        />
      </div> */}
    </div>
  );
}
