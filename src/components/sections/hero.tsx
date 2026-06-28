import Image from "next/image";
import Link from "next/link";
import Caption from "../animation/caption";
import Hero from "../animation/hero";
import { font_caption } from "@/lib/fonts";

const links = [
  { name: "Команда", href: "/#tan" },
  { name: "Новости", href: "/#news" },
  { name: "FAQ", href: "/#faq" },
  { name: "Консультация", href: "/#action" },
];

export default function HeroSection() {
  return (
    <div
      aria-label="hero-section"
      id="cult"
      className="w-full h-screen flex justify-center relative"
    >
      <Image
        src={"/tech/hero-desktop.jpg"}
        alt="Hero-image"
        fill
        loading="eager"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="hidden lg:block object-cover"
      />
      <Image
        src={"/tech/hero-mobile.jpg"}
        alt="Hero-image"
        fill
        loading="eager"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="lg:hidden object-cover"
      />
      <Hero />
      <Caption />
      <nav className="absolute bottom-20 sm:bottom-5 left-0 w-full flex justify-between px-5 animate-links">
        {links.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            className={
              `${font_caption.className} text-secondary -rotate-45 
              sm:rotate-0 text-xs link animate-pulse`
            }
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
