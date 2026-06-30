"use client";

import { motion } from "framer-motion";
import TextBlock from "../UI/text-block";
import ImageBlock from "../UI/image-block";
import { cult1, cult2 } from "@/lib/text";
import { font_accent } from "@/lib/fonts";
import Decor from "../UI/decor";

export default function AboutSection2({ cloudPath }: { cloudPath: string }) {
  return (
    <div className="grid grid-cols-1 gap-4 h-[250vh] lg:h-screen lg:grid-cols-4 lg:grid-rows-2 relative">
      <Decor />
      <div
        className={`${font_accent.className} col-span-1 lg:col-span-2 lg:row-span-1
              text-5xl lg:text-6xl flex items-center justify-center lg:justify-start`}
      >
        Почему мы?
      </div>

      <div className="col-span-1 row-span-1 relative">
        <ImageBlock src={`${cloudPath}/tech/about-4.webp`} position="20% 50%" />
        <motion.span
          initial={{ backgroundColor: "#0d0d0d" }}
          whileInView={{ backgroundColor: "#402319" }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="image-text"
        >
          Минималистичные линии, масштабные проекты и реставрация — берём задачи
          любой сложности
        </motion.span>
      </div>

      {/* Голубой блок: на lg — занимает 2 строки */}
      <div className="col-span-1 lg:row-span-2 relative">
        <ImageBlock src={`${cloudPath}/tech/about-6.webp`} position="center" />
        <motion.span
          initial={{ backgroundColor: "#0d0d0d" }}
          whileInView={{ backgroundColor: "#402319" }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="image-text"
        >
          Прозрачность, сроки и результат, который хочется показывать.
        </motion.span>
      </div>

      <div className="bg-gray-900 col-span-1 lg:col-span-2 lg:row-span-1 relative">
        <ImageBlock src={`${cloudPath}/tech/about-3.webp`} position="bottom" />
        <motion.span
          initial={{ backgroundColor: "#0d0d0d" }}
          whileInView={{ backgroundColor: "#402319" }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="image-text"
        >
          Опытные мастера и авторские эскизы — каждая работа продумана до линии.
        </motion.span>
      </div>

      <div className="col-span-1 row-span-1 relative">
        <ImageBlock src={`${cloudPath}/tech/about-5.webp`} position="50%_50%" />
        <motion.span
          initial={{ backgroundColor: "#0d0d0d" }}
          whileInView={{ backgroundColor: "#402319" }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="image-text"
        >
          Гарантия качества и стерильность на каждом этапе — доверьте кожу
          профессионалам.
        </motion.span>
      </div>
    </div>
  );
}
