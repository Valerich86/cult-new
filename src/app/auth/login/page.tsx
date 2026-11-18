import { Metadata } from "next";
import Image from "next/image";
import LoginForm from "../../../components/forms/login";
import { font_accent } from "../../../lib/fonts";

export default async function LoginPage() {
  return (
    <div className="w-full h-screen relative text-secondary overflow-hidden">
      <Image
        src={"/tech/wall.webp"}
        alt="action-bg"
        fill
        sizes="100%"
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
      <div className="absolute w-full h-full inset-0 bg-primary/70"></div>
      <div className="absolute inset-0 w-full h-screen flex flex-col items-center justify-center x-spacing">
        <h1 className={`${font_accent.className} text-3xl mb-5 z-50`}>
          Вход в админку
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
