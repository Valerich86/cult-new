import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Административная панель"
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main aria-label="admin">
      {children}
    </main>
  );
}
