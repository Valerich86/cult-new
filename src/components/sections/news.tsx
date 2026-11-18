import Link from "next/link";
import { News } from "../../lib/data";
import { font_caption } from "../../lib/fonts";
import Decor from "../UI/decor";
import AnimatedTitle from "../animation/title";
import NewsItem from "../UI/news-item";

interface Props {
  news: News[];
  isPage?: boolean;
}

export default function NewsSection({ news, isPage = false }: Props) {
  return (
    <section id="news" className="w-full relative">
      <Decor />
      <div
        className={`w-full mb-40 flex justify-center xl:justify-start items-center`}
      >
        <AnimatedTitle text={"Есть новости"} />
      </div>
      <div className="w-full flex flex-col gap-y-20">
        {news?.map((item, index) => {
          return <NewsItem newsItem={item} key={item.id} />;
        })}
        {!isPage && news.length > 0 && (
          <div className="w-full flex justify-center xl:justify-end sm:text-3xl xl:text-base">
            <span>
              Все новости{" "}
              <Link
                href={"/news"}
                className={`${font_caption.className} link animate-pulse`}
              >
                здесь
              </Link>
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
