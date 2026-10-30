import Image from "next/image";
import Caption from "../animation/caption";
import HeroAnimation from "../animation/hero";
import Navigation from "../UI/navigation";
import Decor from "../UI/decor";

export default function HeroSection() {
  return (
    <div
      aria-label="hero-section"
      id="cult"
      className="w-full h-screen flex justify-center relative overflow-hidden"
    >
      <Decor />
      <Image
        src={"/tech/wall.webp"}
        alt="Hero-bg"
        fill
        sizes="100%"
        priority
        loading="eager"
        className="object-cover animate-heroImage"
      />
      <div className="absolute w-full h-full top-0 right-0">
        <Image
          src={"/tech/hero-sculpture.png"}
          alt="Hero-image"
          fill
          sizes="100%"
          priority
          loading="eager"
          className="object-cover md:object-contain object-bottom-right"
        />
      </div>
      <HeroAnimation />
      <div className="absolute w-full flex justify-center left-0 top-[55vh] sm:top-[30vh]">
        <Caption text="Студия татуировки. Пермь" />
      </div>
      <Navigation />
    </div>
  );
}
