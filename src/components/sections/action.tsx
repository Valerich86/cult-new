import { font_caption } from "@/lib/fonts";
import PopupLink from "../UI/popup-link";

export default function ActionSection() {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center gap-y-10 text-center" id="action">
      <h1 className="text-xl md:text-2xl">
        Не уверены, что хотите тату? А вдруг хотите? Давайте поговорим.
      </h1>
      <p>Идея живёт в голове. Мы поможем ей обрести форму на вашей коже.</p>
      <div className="border-b-2 border-brown relative w-full sm:w-1/2 lg:w-1/3 mt-15">
        <PopupLink
          href="https://vk.me/cult_perm"
          blank
          text="Получить консультацию"
        />
      </div>
    </section>
  );
}
