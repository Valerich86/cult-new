"use client";

import { useEffect, useState } from "react";
import { AiOutlineUp } from "react-icons/ai";

export default function BtnTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 1000; // расстояние в пикселях, после которого кнопка появляется
      const currentScroll = typeof window !== "undefined" ? window.scrollY : 0;
      setIsVisible(currentScroll > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    // Проверяем видимость сразу при монтировании (на случай, если страница уже прокручена)
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const el = document.getElementById("cult");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <span
      className="fixed right-[5%] bottom-[10%] animate-pulse text-brown cursor-pointer"
      onClick={scrollToTop}
      aria-label="Наверх"
      role="button"
    >
      <AiOutlineUp size={25} />
    </span>
  );
}
