import { Metadata } from "next";
import Draining from "../../components/animation/draining";
import BackButton from "../../components/UI/back-button";
import { getNews, News } from "../../lib/data";
import Decor from "../../components/UI/decor";
import NewsSection from "../../components/sections/news";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Новости",
  description: "Новости тату-студии CULT в Перми",
};

export default async function NewsPage() {
  let news: News[] = [];

  try {
    news = await getNews();
    if (news.length === 0) redirect("/");
  } catch (error) {
    console.error('Ошибка получения новостей:', error);
    return <p>Ошибка загрузки новостей</p>;
  }

  return (
    <main
      className="x-spacing pt-10 pb-40 relative overflow-hidden w-full"
      aria-label={"Страница новостей"}
    >
      <BackButton target={`/#news`} />
      <Draining />
      <Decor />
      
      {news && news.length > 0 && <NewsSection news={news} isPage/>}
    </main>
  );
}
