import Image from "next/image";
import PopupLink from "../UI/popup-link";
import Decor from "../UI/decor";

export default function ActionSection() {
  return (
    <section
      className="w-full h-screen flex flex-col justify-center items-center gap-y-10 text-center relative mt-10 text-primary px-2"
      id="action"
    >
      <Decor />
      <div className="absolute inset-0 w-full h-full grayscale-75 shadow overflow-hidden">
        <Image
          src={"/tech/wall.webp"}
          alt="action-bg"
          fill
          sizes="100%"
          className="object-cover animate-heroImage"
        />
      </div>
      <h1 className="text-xl sm:text-5xl xl:text-2xl z-10">
        Не уверены, что хотите тату? А вдруг хотите? Давайте поговорим.
      </h1>
      <p className="sm:text-4xl xl:text-base z-10">
        Идея живёт в голове. Мы поможем ей обрести форму на вашей коже.
      </p>
      <div className="border-b-2 border-brown relative w-full xl:w-1/3 mt-15">
        <PopupLink
          href="https://vk.me/cult_perm"
          blank
          text="Получить консультацию"
        />
      </div>
    </section>
  );
}
