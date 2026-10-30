import { Metadata } from "next";
import Draining from "../../components/animation/draining";
import BackButton from "../../components/UI/back-button";
import { getNews, News } from "../../lib/data";
import Decor from "../../components/UI/decor";
import NewsSection from "../../components/sections/news";

export const metadata: Metadata = {
  title: "Новости",
  description: "Новости тату-студии CULT, город Пермь",
};

export default async function NewsPage() {
  let news: News[] = [];

  try {
    news = await getNews();
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
      
      {news && news.length && <NewsSection news={news} isPage/>}
    </main>
  );
}
