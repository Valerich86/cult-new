"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ImageBlock from "../UI/image-block";

export default function GiftSection({ cloudPath }: { cloudPath: string }) {
  return (
    <div className="h-[50vh] w-full relative mt-4">
      <Image
        src={`${cloudPath}/tech/gift.webp`}
        alt={`Изображение подарочного сертификата`}
        loading="eager"
        fill
        sizes="100%"
        className={`object-contain bg-primary transition duration-2000 hover:scale-110 grayscale-80`}
      />
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
  );
}
