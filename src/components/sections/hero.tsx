import Image from "next/image";
import Caption from "../animation/caption";
import Hero from "../animation/hero";

export default function HeroSection() {
  return (
    <div
      aria-label="hero-section" id="cult"
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
    </div>
  );
}
