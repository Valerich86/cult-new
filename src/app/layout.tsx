import "./globals.css";
import type { Metadata } from "next";
import {
  YandexMetricaProvider,
  standardYMInitParameters,
} from "@artginzburg/next-ym";
import { font_default } from "../lib/fonts";
import Footer from "../components/UI/footer";
import CookieBanner from "../components/UI/cookie-bunner";
import ConsentMetrica from "../components/metrica/consent-metrica";

export const metadata: Metadata = {
  title: {
    template: "CULT - %s",
    default: "CULT",
  },
  description:
    "Тату-студия CULT в Перми. Профессиональные мастера, стили реализм, evil organic, абстракция, blackwork, dark ornamental, минимализм, сюрреализм, linework, sketch, перекрытие старых татуировок. Новости и консультация",
  metadataBase: new URL(process.env.BASE_URL ?? "https://culttattoo.ru/"),
  openGraph: {
    title: "Тату-студия CULT в Перми",
    description:
      "Профессиональные мастера, стили реализм, evil organic, абстракция, blackwork, dark ornamental, минимализм, сюрреализм, linework, sketch, перекрытие старых татуировок. Новости и консультация",
    url: "/",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "/tech/logo.png", // Путь к изображению
        width: 360,
        height: 360,
        alt: "логотип CULT",
      },
    ],
    siteName: "CULT",
  },
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
        <ConsentMetrica>{children}</ConsentMetrica>
        <CookieBanner />
        <Footer />
      </body>
    </html>
  );
}
