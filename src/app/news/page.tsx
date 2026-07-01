import { Metadata } from "next";
import Draining from "@/components/animation/draining";
import BackButton from "@/components/UI/back-button";
import { getNews } from "@/lib/data";
import Decor from "@/components/UI/decor";
import NewsSection from "@/components/sections/news";

export const metadata: Metadata = {
  title: "Новости",
  description: "Новости тату-студии CULT",
};

export default async function NewsPage() {
  const news = await getNews();

  return (
    <main
      className="x-spacing pt-10 pb-25 relative"
      aria-label={"Страница новостей"}
    >
      <BackButton target={`/#news`} />
      <Draining />
      <Decor />
      
      <NewsSection news={news} isPage/>
    </main>
  );
}
