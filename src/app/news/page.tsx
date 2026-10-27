import { Metadata } from "next";
import Draining from "../../components/animation/draining";
import BackButton from "../../components/UI/back-button";
import { News } from "../../lib/data";
import Decor from "../../components/UI/decor";
import NewsSection from "../../components/sections/news";

export const metadata: Metadata = {
  title: "Новости",
  description: "Новости тату-студии CULT, город Пермь",
};

export default async function NewsPage() {
  const res = await fetch('/api/news', {
      cache: 'no-store', 
    });
  
    if (!res.ok) {
      return <p>Ошибка загрузки новостей</p>;
    }
  
    const news:News[] = await res.json();

  if (!news || news.length === 0) {
    return (<div className="x-spacing pt-10 h-screen">Новостей нет...</div>)
  }

  return (
    <main
      className="x-spacing pt-10 pb-25 relative overflow-hidden"
      aria-label={"Страница новостей"}
    >
      <BackButton target={`/#news`} />
      <Draining />
      <Decor />
      
      <NewsSection news={news} isPage/>
    </main>
  );
}
