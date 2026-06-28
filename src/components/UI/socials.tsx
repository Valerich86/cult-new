import { FaInstagram, FaPhone } from "react-icons/fa";
import { RiTelegramFill, RiYoutubeFill } from "react-icons/ri";
import { FaVk } from "react-icons/fa";
import Link from "next/link";
import { font_caption } from "@/lib/fonts";

interface SocialsProps {
  name: string;
  href: string;
  tg_href?: string;
  vk_href?: string;
  phone?: string;
  phone_href?: string;
}

export default function Socials({
  name,
  href,
  tg_href = undefined,
  vk_href = undefined,
  phone = undefined,
  phone_href = undefined,
}: SocialsProps) {
  return (
    <div className="flex flex-wrap gap-5 items-center text-xs">
      <Link href={href} className={`link ${font_caption.className}`}>{name}</Link>
      {tg_href && (
        <a href={tg_href} target="_blank" aria-label="Telegram">
          <RiTelegramFill
            className="link"
            size={27}
          />
        </a>
      )}
      {vk_href && (
        <a href={vk_href} target="_blank" aria-label="ВКонтакте">
          <FaVk
            className="link"
            size={30}
          />
        </a>
      )}
      {phone && (
        <a href={phone_href} target="_blank" aria-label="Телефон">
          <FaPhone
            className="link"
            size={20}
          />
        </a>
      )}
    </div>
  );
}
