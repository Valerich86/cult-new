"use client";

import Image from "next/image";
import { AiOutlineUp } from "react-icons/ai";
import { font_accent } from "@/lib/fonts";
import { faq } from "@/lib/text";
import { useState } from "react";

export default function FaqSection() {
  const [visibleAnswer, setVisibleAnswer] = useState<Number|null>(null);
  return (
    <div className="grid grid-cols-1 h-[150vh] lg:h-screen lg:grid-cols-2 grid-rows-3 lg:grid-rows-2 bg-primary text-secondary">
      <div
        className={`${font_accent.className} col-span-1 lg:col-span-1 row-span-1 
        text-5xl lg:text-6xl flex items-center justify-center lg:justify-start px-5`}
      >
        Часто задаваемые вопросы
      </div>
      <div className="col-span-1 row-span-2 relative hidden lg:block">
        <Image
          src={"/tech/hero-mobile-3.jpg"}
          alt={"Задний фон секции FAQ"}
          loading="eager"
          fill
          className={`object-cover grayscale-80`}
        />
      </div>
      <div className="col-span-1 row-span-2 lg:row-span-1 flex flex-col justify-between">
        {faq.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => setVisibleAnswer(visibleAnswer === index ? null : index)}
              className={
                `${index !== faq.length - 1 ? "border-b" : ""} font-bold text-sm border-secondary py-4 flex justify-between items-center relative px-5 cursor-pointer`
              }
            >
              <p className="pr-2">{item.question}</p>
              <div
                className={`link ${visibleAnswer !== index ? "rotate-180" : ""} transition duration-500`}
              >
                <AiOutlineUp size={15} />
              </div>
              <div
                className={`absolute top-full left-0 flex transition-all duration-500 
                bg-brown shadow-sm shadow-secondary z-10 p-5 text-xs w-full
                ${visibleAnswer === index ? "translate-y-0 opacity-100 scale-y-100" : "-translate-y-20 opacity-0 scale-y-0"}`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
