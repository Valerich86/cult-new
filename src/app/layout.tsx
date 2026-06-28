import type { Metadata } from "next";
import "./globals.css";
import { font_default } from "@/lib/fonts";
import BackButton from "@/components/UI/back-button";
import Footer from "@/components/UI/footer";

export const metadata: Metadata = {
  title: {
    template: "CULT | %s",
    default: "CULT",
  },
  description: "Тату-студия. Город Пермь",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body
        className={`min-h-full flex flex-col overflow-x-hidden ${font_default.className} text-lg text-brown bg-secondary`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
