"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ImageBlock from "../UI/image-block";
import { cult1, cult2 } from "@/lib/text";
import { font_accent } from "@/lib/fonts";
import Decor from "../UI/decor";
import Draining from "../animation/draining";
import AnimatedTitle from "../animation/title";

export default function AboutSection2({ cloudPath }: { cloudPath: string }) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 h-[250vh] w-full xl:h-screen xl:grid-cols-4 xl:grid-rows-2 relative">
        <Decor />
        <div
          className={`col-span-1 xl:col-span-2 xl:row-span-1 flex flex-wrap justify-center xl:justify-start items-center`}
        >
          <AnimatedTitle text="Почему мы?"/>
        </div>

        <div className="col-span-1 row-span-1 relative">
          <ImageBlock
            src={`${cloudPath}/tech/about-4.webp`}
            position="20% 50%"
          />
          <motion.span
            initial={{ backgroundColor: "#0d0d0d" }}
            whileInView={{ backgroundColor: "#402319" }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="image-text"
          >
            Тату, перекрытие, эскизы, коррекция — берём задачи любой сложности
          </motion.span>
        </div>

        <div className="col-span-1 xl:row-span-2 relative">
          <ImageBlock
            src={`${cloudPath}/tech/about-6.webp`}
            position="center"
          />
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

        <div className="bg-gray-900 col-span-1 xl:col-span-2 xl:row-span-1 relative">
          <ImageBlock
            src={`${cloudPath}/tech/about-3.webp`}
            position="bottom"
          />
          <motion.span
            initial={{ backgroundColor: "#0d0d0d" }}
            whileInView={{ backgroundColor: "#402319" }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="image-text"
          >
            Опытные мастера и авторские эскизы — каждая работа продумана до
            линии.
          </motion.span>
        </div>

        <div className="col-span-1 row-span-1 relative">
          <ImageBlock
            src={`${cloudPath}/tech/about-5.webp`}
            position="50%_50%"
          />
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
      <div className="h-[50vh] w-full relative mt-4">
        <div className="w-full h-full overflow-hidden relative">
          <Image
            src={`${cloudPath}/tech/gift.webp`}
            alt={`Изображение подарочного сертификата`}
            loading="eager"
            fill
            sizes="100%"
            className={`object-contain bg-primary transition duration-2000 hover:scale-110 grayscale-80`}
          />
        </div>
        <motion.span
          initial={{ backgroundColor: "#0d0d0d" }}
          whileInView={{ backgroundColor: "#402319" }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="image-text"
        >
          В нашей студии вы всегда можете приобрести подарочный сертификат на
          татуировку на любую сумму от 2000₽
        </motion.span>
      </div>
    </div>
  );
}
