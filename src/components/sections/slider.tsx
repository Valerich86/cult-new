"use client";

import { useState, useEffect, useRef  } from "react";
import { useSwipeable } from "react-swipeable";
import { FaPlay, FaPause } from "react-icons/fa";
import TextBlock from "../UI/text-block";
import { font_accent } from "@/lib/fonts";
import { slides } from "@/lib/text";
import VideoBlock from "../UI/video-block";

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [play, setPlay] = useState(true);
  const length = slides.length;

  // Храним таймер в ref — он не будет сбрасываться при ререндерах
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Функция сброса и перезапуска таймера
  const resetTimer = () => {
    if (!play) {
      // Если автоплей выключен, просто ничего не делаем или можно явно остановить
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    // Останавливаем старый таймер, если есть
    if (timerRef.current) clearInterval(timerRef.current);

    // Запускаем новый
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 10000);
  };

  // Эффект следит за состоянием play и запускает/останавливает таймер
  useEffect(() => {
    if (!play) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    
    resetTimer(); // Запускаем таймер при включении

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [play]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev !== length - 1 ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev !== 0 ? prev - 1 : length - 1));
  };

  const handleClickNav = (index: number) => {
    setCurrentSlide(index);
    // При клике по навигации обязательно перезапускаем таймер (сбрасываем отсчет)
    resetTimer();
  };


  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentSlide !== length - 1) {
        nextSlide();
        resetTimer();
      }
    },
    onSwipedRight: () => {
      if (currentSlide !== 0) {
        prevSlide();
        resetTimer();
      }
    },
    delta: 10,
    trackMouse: true,
  });


  return (
    <section id="styles" className="w-full">
      <div
        className={`w-full flex ${font_accent.className} text-4xl sm:text-5xl lg:text-6xl mb-[20vh] mt-[20vh] lg:mt-0 items-center justify-center lg:justify-start`}
      >
        Что мы делаем:
      </div>
      <div className="w-full h-[90vh] overflow-x-hidden relative">
        <div
          className={`flex transition duration-300 h-full`}
          style={{
            width: `${length * 100}%`,
            transform: `translateX(-${(currentSlide / length) * 100}%)`,
          }}
          {...swipeHandlers} // подключаем все обработчики
        >
          {slides?.map((item) => {
            return (
              <div
                key={item.id}
                id={item.id}
                className="w-full flex flex-col lg:flex-row bg-primary text-secondary"
              >
                <div className="w-full lg:w-1/2 flex flex-col justify-between">
                  <div className="h-[30vh] flex items-center">
                    <h2 className="p-5">{item.label}</h2>
                  </div>
                  <div className="w-full h-full hidden lg:flex">
                    <TextBlock text={item.description} />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 h-[70vh] lg:h-[90vh]">
                  <VideoBlock src={item.media_url} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full absolute left-0 bottom-5 flex justify-center items-center gap-3">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => handleClickNav(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer
                ${currentSlide === index ? "bg-peachy2 scale-50" : "bg-peachy1 scale-100"}`}
            ></div>
          ))}
        </div>
        <div className="w-full absolute left-0 top-5 flex justify-center text-peachy1">
          {play ? (
            <div onClick={() => setPlay(false)} className="cursor-pointer">
              <FaPause />
            </div>
          ) : (
            <div onClick={() => setPlay(true)} className="cursor-pointer">
              <FaPlay />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
