import { font_caption } from "@/lib/fonts";
import { Metadata } from "next";
import Socials from "./socials";
import { footerText } from "@/lib/text";

export default function Footer() {
  return (
    <div
      className="bg-peachy1/20 border-t border-peachy1 x-spacing flex flex-col lg:flex-row text-sm lg:text-sm justify-between"
      aria-label="footer"
    >
      <div className="w-full lg:w-[30%] lg:h-[50vh] py-10 flex flex-col justify-between">
        <pre className="whitespace-pre-wrap">{footerText}</pre>
      </div>
      {/* соцсети */}
      <div className="w-full lg:w-[30%] lg:h-[50vh] py-10 flex flex-col justify-between gap-5">
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
          tg_href="https://vk.com/away.php?utf=1&to=https%3A%2F%2Ft.me%2Feckerttattoo"
        />
      </div>

      {/* интерактивная карта */}
      <div className="w-full lg:w-[30%] h-[50vh] py-10 flex flex-col justify-center">
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
