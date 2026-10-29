"use client";

import { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import TextBlock from "../UI/text-block";
import { slides } from "../../lib/text";
import VideoBlock from "../UI/video-block";
import Decor from "../UI/decor";
import ImageBlock from "../UI/image-block";
import AnimatedTitle from "../animation/title";

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [play, setPlay] = useState(true);
  const length = slides.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null); 


  const resetTimer = () => {
    if (!play) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 15000);
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



  // предзагрузка следующего слайда (критически важно)
  useEffect(() => {
    const nextIndex = (currentSlide + 1) % slides.length;
    const nextSlide = slides[nextIndex];
    if (nextSlide?.media_url) {
      const img = new Image();
      img.src = nextSlide.media_url; 
    }
  }, [currentSlide, slides]);



  const nextSlide = () => {
    setCurrentSlide((prev) => (prev !== length - 1 ? prev + 1 : 0));
  };



  const prevSlide = () => {
    setCurrentSlide((prev) => (prev !== 0 ? prev - 1 : length - 1));
  };



  const handleClickNav = (index: number) => {
    setCurrentSlide(index);
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



  return (
    <section id="styles" className="w-full relative">
      <Decor />
      <div
        className={`flex flex-wrap justify-center xl:justify-start items-center min-h-[40vh]`}
      >
        <AnimatedTitle text="Что мы делаем?"/>
      </div>
      <div
        className="w-full h-[90vh] relative overflow-x-hidden shadow bg-primary"
        {...swipeHandlers}
      >
        <AnimatePresence>
          {slides?.map(
            (item, index) =>
              index === currentSlide && (
                <motion.div
                  key={item.id}
                  id={item.id}
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                  className={`flex flex-col xl:flex-row w-full h-full absolute inset-0 bg-primary text-secondary`}
                >
                  <div className="w-full xl:w-1/2 flex flex-col h-1/2 xl:h-full justify-between">
                    <div className="h-1/4 xl:h-1/3 flex items-center">
                      <h2 className="p-4">{item.label}</h2>
                    </div>
                    <div className="w-full h-3/4 xl:h-full text-xs xl:text-base">
                      <TextBlock text={item.description} animate={false} />
                    </div>
                  </div>
                  <div className="w-full xl:w-1/2 h-1/2 xl:h-full">
                    {item.media_type === "video" ? (
                      <VideoBlock src={item.media_url} />
                    ) : (
                      <ImageBlock src={item.media_url} alt={item.media_url} />
                    )}
                  </div>
                </motion.div>
              ),
          )}
        </AnimatePresence>
        <div className="w-full absolute left-0 bottom-5 flex justify-center items-center gap-3">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => handleClickNav(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer
                ${currentSlide === index ? "bg-peachy2 scale-65" : "bg-peachy1 scale-100"}`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
