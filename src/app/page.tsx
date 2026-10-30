import { getCloudPath, getGallery } from "../lib/cloud";
import { getNews, News } from "../lib/data";
import HeroSection from "../components/sections/hero";
import AboutSection1 from "../components/sections/about-1";
import AboutSection2 from "../components/sections/about-2";
import MastersSection from "../components/sections/masters";
import ActionSection from "../components/sections/action";
import FaqSection from "../components/sections/faq";
import Draining from "../components/animation/draining";
import NewsSection from "../components/sections/news";
import Slider from "../components/sections/slider";
import BtnTop from "../components/UI/btn-top";
import ReviewsSection from "../components/sections/reviews";

const folders = ["tan", "sonya", "arthur"] as const;

type Folder = (typeof folders)[number];

export const dynamic = "force-dynamic";

export default async function Home() {
  const gallery: Record<
    Folder,
    Awaited<ReturnType<typeof getGallery>>
  > = {} as any;

  for (const folder of folders) {
    gallery[folder] = await getGallery(folder, 10);
  }
  let news: News[] = [];

  try {
    news = await getNews(3);
  } catch (error) {
    console.error('Ошибка получения новостей:', error);
    return <p>Ошибка загрузки новостей</p>;
  }
  const cloudPath = getCloudPath();

  return (
    <main
      className="xl:px-50 sm:px-25 flex flex-col gap-4 pb-40 relative overflow-hidden"
      aria-label="Главная"
    >
      <div className="absolute top-0 right-0 w-50 hidden lg:flex">
        <Draining />
      </div>
      <HeroSection />
      <div className="px-4 xl:px-0 sm:px-0 w-full space-y-40">
        <AboutSection1 cloudPath={cloudPath} />
        <AboutSection2 cloudPath={cloudPath} />
        {gallery && <MastersSection gallery={gallery} cloudPath={cloudPath} />}
        <Slider />
        {news && <NewsSection news={news} />}
        <FaqSection cloudPath={cloudPath} />
        <ReviewsSection />
        <ActionSection />
      </div>
      <BtnTop />
    </main>
  );
}
