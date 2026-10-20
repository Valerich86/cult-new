"use client";

import { getReviews } from "@/lib/vk-reviews";
import { reviews, REVIEWS_HREF } from "@/lib/temp";
import AnimatedTitle from "../animation/title";
import Decor from "../UI/decor";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { font_caption } from "@/lib/fonts";
import Image from "next/image";
import ImageBlock from "../UI/image-block";
import PopupLink from "../UI/popup-link";
import TruncatedText from "../UI/trancated-text";
import ReviewDesktop from "../UI/review-desktop";
import ReviewMobile from "../UI/review-mobile";
import { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";

export default function ReviewsSection() {
  // let reviews: Awaited<ReturnType<typeof getReviews>> = [];
  // try {
  //   reviews = await getReviews(5);
  // } catch (e) {
  //   return <div>Ошибка VK: {(e as Error).message}</div>;
  // }
  const [current, setCurrent] = useState(0);
  const [play, setPlay] = useState(true);
  const length = reviews.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (!play) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  // Эффект следит за состоянием play и запускает/останавливает таймер
  useEffect(() => {
    if (!play) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [play]);

  const nextSlide = () => {
    setCurrent((prev) => (prev !== length - 1 ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev !== 0 ? prev - 1 : length - 1));
  };

  const handleClickNav = (index: number) => {
    setCurrent(index);
    resetTimer();
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      nextSlide();
      resetTimer();
    },
    onSwipedRight: () => {
      prevSlide();
      resetTimer();
    },
    delta: 10,
    trackMouse: true,
  });

  if (!length) return null;

  return (
    <section id="reviews" className="relative">
      <Decor />
      <div
        className={`flex flex-wrap justify-center xl:justify-start items-center min-h-[40vh]`}
      >
        <AnimatedTitle text="Отзывы" />
      </div>
      <div className="hidden sm:flex flex-wrap w-full gap-10 justify-between overflow-hidden max-h-100">
        {reviews.map((r, i) => (
          <ReviewDesktop key={r.id} review={r} index={i} />
        ))}
      </div>
      <div className="w-full sm:hidden h-120 relative" {...swipeHandlers}>
        {reviews.map((r, i) => (
          <ReviewMobile key={r.id} review={r} index={i} current={current} />
        ))}
        <div className="w-full absolute left-0 bottom-5 flex justify-center items-center gap-3">
          {reviews.map((_, index) => (
            <div
              key={index}
              onClick={() => handleClickNav(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer
                        ${current === index ? "bg-primary scale-65" : "bg-brown scale-100"}`}
            ></div>
          ))}
        </div>
      </div>
      {reviews.length && (
        <div className="w-full flex justify-center xl:justify-end sm:text-3xl xl:text-base mt-10 border-t">
          <span>
            Все отзывы{" "}
            <Link
              href={REVIEWS_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={`${font_caption.className} link animate-pulse`}
            >
              здесь
            </Link>
          </span>
        </div>
      )}
    </section>
  );
}
