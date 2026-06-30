import BackButton from "@/components/UI/back-button";
import { font_caption } from "@/lib/fonts";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Административная панель"
};

const links = [
  {name: "Новости", href: "/admin"},
  {name: "Отзывы", href: "/admin"},
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main aria-label="admin" className="bg-primary text-secondary w-full min-h-screen relative text-base">
      {/* <nav className="absolute h-5 inset-0 w-full flex justify-center gap-10 my-3" aria-label="Навигация по админ. панели">
        {links.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            className={`${font_caption.className} text-peachy1 text-xs link animate-pulse`}
          >
            {link.name}
          </Link>
        ))}
      </nav> */}
      <div className="w-full x-spacing my-20">
        {children}
      </div>
    </main>
  );
}
