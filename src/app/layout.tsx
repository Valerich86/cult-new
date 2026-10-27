import "./globals.css";
import type { Metadata } from "next";
import { font_default } from "../lib/fonts";
import Footer from "../components/UI/footer";

export const metadata: Metadata = {
  title: {
    template: "CULT | %s",
    default: "CULT",
  },
  description: "Тату-студия CULT, город Пермь. Описание, знакомство с мастерами, стили работ, часто задаваемые вопросы, новости студии",
  keywords: ["тату-студия", "тату-салон", "татуировка", "мастер тату", "перекрытие", "Пермь", "рукав", "реализм", "минимализм", "сюрреализм", "даркворк", "лайнворк"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body
        className={`min-h-full flex flex-col overflow-x-hidden ${font_default.className} text-brown bg-secondary`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
