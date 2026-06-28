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
    <div className="flex flex-wrap gap-5 items-center">
      <Link href={href} className={`text-secondary text-xs link ${font_caption.className}`}>{name}</Link>
      {tg_href && (
        <a href={tg_href} target="_blank" aria-label="Telegram">
          <RiTelegramFill
            className="hover:text-[#ff6f61] text-[#85b2ff] transition-colors"
            size={27}
          />
        </a>
      )}
      {vk_href && (
        <a href={vk_href} target="_blank" aria-label="ВКонтакте">
          <FaVk
            className="hover:text-secondary text-[#4680C2] transition-colors"
            size={30}
          />
        </a>
      )}
      {phone && (
        <a href={phone_href} target="_blank" aria-label="Телефон">
          <FaPhone
            className="hover:text-secondary text-peachy1 transition-colors"
            size={20}
          />
        </a>
      )}
    </div>
  );
}
