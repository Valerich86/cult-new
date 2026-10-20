import { font_caption } from "@/lib/fonts";
import { Metadata } from "next";
import Socials from "./socials";
import { footerText } from "@/lib/text";
import Image from "next/image";
import Decor from "./decor";
import VideoBlock from "./video-block";

export default function Footer() {
  return (
    <div
      className="bg-peachy1/20 border-t border-peachy1 x-spacing flex flex-col xl:flex-row text-sm xl:text-sm justify-between relative overflow-hidden"
      aria-label="footer"
    >
      <Decor />
      <div className="w-full xl:w-[30%] xl:h-[50vh] py-10 flex flex-col justify-between">
        <pre className="whitespace-pre-wrap sm:text-2xl xl:text-sm">
          {footerText}
        </pre>
      </div>
      {/* соцсети */}
      <div className="w-full xl:w-[30%] h-[33vh] xl:h-[50vh] py-10 flex flex-col justify-between">
        <Socials
          href={`/#cult`}
          name="CULT"
          vk_href="https://vk.link/cult_perm"
          tg_href="https://vk.com/away.php?to=https%3A%2F%2Ft.me%2Fcult_perm"
          phone_href="tel:+79630173055"
          phone="+7(963)017-30-55"
        />
        <Socials
          name="Андрей"
          href={`/info/tan`}
          vk_href="https://vk.com/id90911293"
          tg_href="https://t.me/tancult"
          phone_href="tel:+79630173055"
          phone="+7(963)017-30-55"
        />
        <Socials
          name="Соня"
          href={`/info/sonya`}
          vk_href="https://vk.com/id33149904"
        />
        <Socials
          name="Артур"
          href={`/info/arthur`}
          vk_href="https://vk.com/id638396972"
          tg_href="https://t.me/eckerttattoo"
        />
        <div className="flex items-center">
          <span className="sm:text-2xl xl:text-sm">Разработал сайт:</span>
          <div className="h-20">
            <VideoBlock src={"/tech/my-logo.webm"} loop/>
          </div>
          <Socials tg_href="https://t.me/ryazanovyozh" />
        </div>
      </div>

      {/* интерактивная карта */}
      <div className="w-full xl:w-[30%] h-[50vh] py-10 flex flex-col justify-center">
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A4fc762a2faeae833170d060d0b03b5a1474a375acda93739316fc98b5e1522ab&amp;source=constructor"
          width="100%"
          height="418"
          className="rounded-2xl"
        ></iframe>
      </div>
    </div>
  );
}
