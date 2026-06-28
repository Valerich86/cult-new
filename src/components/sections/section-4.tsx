import { GiEvilEyes } from "react-icons/gi";
import { font_caption } from "@/lib/fonts";

export default function Section4() {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center gap-y-10 text-center">
      <h1 className="text-xl md:text-2xl">Не уверены, что хотите тату? А вдруг хотите? Давайте поговорим."</h1>
      <p>Идея живёт в голове. Мы поможем ей обрести форму на вашей коже.</p>
      <a
        href="https://vk.me/cult_perm"
        target="_blank"
        aria-label="consultation"
        className={`${font_caption.className} link text-brown flex items-center`}
      >
        Получить <GiEvilEyes size={70} /> консультацию
      </a>
    </section>
  );
}
