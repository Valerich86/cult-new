import Link from "next/link";
import Image from "next/image";
import { font_caption } from "../../lib/fonts";

export default function AdminPage() {
  const links = [
    { name: "Новости", href: "/admin/news" },
    { name: "Галерея", href: "/admin/gallery" },
    // { name: "Другое", href: "/admin/any" },
  ];

  return (
    <main className="w-full min-h-screen relative overflow-hidden flex justify-center items-center">
      <Image
        src={"/tech/wall.webp"}
        alt="action-bg"
        fill
        sizes="100%"
        className="object-cover animate-heroImage"
      />
      <div className="absolute w-full h-full inset-0 bg-primary/70"></div>
      <nav className={`${font_caption.className} z-20 text-peachy1 flex flex-col gap-y-10 animate-tremor`}>
        {links.map((link, i) => (
          <Link href={link.href} key={i} className={`link`} style={{fontSize: "30px"}}>
            {link.name}
          </Link>
        ))}
      </nav>
    </main>
  );
}
