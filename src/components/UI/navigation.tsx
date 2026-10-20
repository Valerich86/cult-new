"use client";

import { font_caption } from "@/lib/fonts";
import Link from "next/link";
import { useState } from "react";

const links = [
  { name: "Команда", href: "/#tan" },
  { name: "Новости", href: "/#news" },
  { name: "FAQ", href: "/#faq" },
  { name: "Отзывы", href: "/#reviews" },
  { name: "Консультация", href: "/#action" },
];

export default function Navigation() {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <>
      <nav
        className="absolute bottom-20 sm:bottom-5 left-0 w-full hidden sm:flex justify-between px-5 animate-links"
        aria-label="Навигация по главной странице"
      >
        {links.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            className={`${font_caption.className} text-peachy1 sm:-rotate-45 
              lg:rotate-0 link animate-pulse`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <div className="absolute top-5 left-5 text-peachy1 sm:hidden">
        <div className={`${font_caption.className} border p-2 animate-tremor`}>
          <span
            role="button"
            onClick={() => setMenuOpened((prev) => !prev)}
            className="text-2xl"
          >
            Карта сайта
          </span>
          <nav
            className={`${menuOpened && "mt-10 mb-5"} flex-col gap-y-10 text-lg overflow-hidden`}
          >
            {links.map((link, i) => (
              <div
                key={i}
                className={`${menuOpened ? "translate-x-0 h-auto opacity-100" : "-translate-x-100 h-0 opacity-0"}`}
                style={{ transition: `${0.3 + 0.3 * i}s ease-in-out` }}
              >
                <Link href={link.href} className={`link`} onClick={() => setMenuOpened(false)}>
                  {link.name}
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
