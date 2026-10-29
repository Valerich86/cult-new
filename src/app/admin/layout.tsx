import { verifySession } from "../../lib/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Административная панель"
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
    <main aria-label="admin" className="bg-primary text-secondary w-full min-h-screen relative text-base">
      <div className="w-full x-spacing my-20">
        {children}
      </div>
    </main>
  );
}
