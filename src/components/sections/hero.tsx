import Image from "next/image";
import Link from "next/link";
import Caption from "../animation/caption";
import Hero from "../animation/hero";
import { font_caption } from "@/lib/fonts";
import Navigation from "../UI/navigation";

export default function HeroSection() {
  return (
    <div
      aria-label="hero-section"
      id="cult"
      className="w-full h-screen flex justify-center relative"
    >
      <Image
        src={"/tech/sculpture.jpg"}
        alt="Hero-image"
        fill
        sizes="100%"
        priority
        loading="eager"
        className="hidden xl:block object-cover"
      />
      <Image
        src={"/tech/hero-mobile.jpg"}
        alt="Hero-image"
        fill
        sizes="100%"
        loading="eager"
        priority
        className="xl:hidden object-cover"
      />
      <Hero />
      <div className="absolute w-full flex justify-center left-0 top-[55vh] sm:top-[30vh]">
        <Caption text="Студия татуировки. Пермь" />
      </div>
      <Navigation />
    </div>
  );
}
