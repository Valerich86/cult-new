"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ImageBlock from "../UI/image-block";
import Decor from "../UI/decor";
import AnimatedTitle from "../animation/title";

export default function AboutSection2({ cloudPath }: { cloudPath: string }) {
  return (
    <div className="w-full">
      <div
        className={`flex flex-wrap justify-center xl:justify-start items-center mb-40`}
      >
        <AnimatedTitle text="Почему мы?" />
      </div>
      <div className="grid grid-cols-1 gap-4 h-[250vh] w-full xl:h-screen xl:grid-cols-4 xl:grid-rows-2 relative">
        <Decor />
        <div className={`col-span-1 xl:col-span-2 xl:row-span-1 relative`}>
          <ImageBlock
            src={`${cloudPath}/tech/skull.jpg`}
            position="20% 50%"
          />
          <motion.span
            initial={{ backgroundColor: "#8c5e4d" }}
            whileInView={{ backgroundColor: "#0d0d0d" }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="image-text"
          >
            Здесь ты можешь расслабиться. Будь, как дома 🤘
          </motion.span>
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
            transition={{ duration: 1, ease: "easeOut" }}
            className="image-text"
          >
            Разнообразие татуировок, от классического черного до ярких цветных
            изображений.
          </motion.span>
        </div>

        <div className="col-span-1 xl:row-span-2 relative">
          <ImageBlock
            src={`${cloudPath}/tech/about-6.webp`}
            position="center"
          />
          <motion.span
            initial={{ backgroundColor: "#0d0d0d" }}
            whileInView={{ backgroundColor: "#8c5e4d" }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1, ease: "easeOut" }}
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
            transition={{ duration: 1, ease: "easeOut" }}
            className="image-text"
          >
            Опытные мастера, у каждого уникальный стиль и подход к работе.
          </motion.span>
        </div>

        <div className="col-span-1 row-span-1 relative">
          <ImageBlock
            src={`${cloudPath}/tech/about-5.webp`}
            position="50%_50%"
          />
          <motion.span
            initial={{ backgroundColor: "#8c5e4d" }}
            whileInView={{ backgroundColor: "#0d0d0d" }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="image-text"
          >
            Гарантия качества и стерильность на каждом этапе — доверьте кожу
            профессионалам.
          </motion.span>
        </div>
      </div>
      <div className="h-[50vh] w-full relative mt-4">
        <div className="w-full h-full overflow-hidden relative">
          {/* <ImageBlock
            src={`${cloudPath}/tech/gift.webp`}
            position="50%_50%"
          /> */}
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
          transition={{ duration: 1, ease: "easeOut" }}
          className="image-text"
        >
          В нашей студии вы всегда можете приобрести подарочный сертификат на
          татуировку на любую сумму от 3000₽
        </motion.span>
      </div>
    </div>
  );
}
