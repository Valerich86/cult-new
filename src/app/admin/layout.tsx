import { verifySession } from "@/lib/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Административная панель"
};

const links = [
  {name: "Новости", href: "/admin"},
  {name: "Отзывы", href: "/admin"},
];

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await verifySession();
  if (!session?.userId) redirect("/auth/login");

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
