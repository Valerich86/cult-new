import { verifySession } from "../../lib/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Decor from "../../components/UI/decor";

export const metadata: Metadata = {
  title: "CULT - Административная панель"
};

const links = [
  {name: "Новости", href: "/admin"},
  {name: "Отзывы", href: "/admin"},
];

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await verifySession();
  if (!session?.userId) redirect("/auth/login");

  return (
    <main aria-label="admin" className="bg-secondary overflow-hidden text-brown w-full min-h-screen relative text-base">
      <Decor count={10} zIgnore/>
      <div className="w-full x-spacing relative">
        {children}
      </div>
    </main>
  );
}
