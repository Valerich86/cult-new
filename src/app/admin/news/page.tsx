import DeleteForm from "../../../components/forms/delete";
import BackButton from "../../../components/UI/back-button";
import PopupLink from "../../../components/UI/popup-link";
import { getNews, News } from "../../../lib/data";
import { font_caption } from "../../../lib/fonts";
import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";

export default async function AdminNews() {
  let news: News[] = [];

  try {
    news = await getNews();
  } catch (error) {
    console.error('Ошибка получения новостей:', error);
    return <p>Ошибка загрузки новостей</p>;
  }

  return (
    <div className="mt-25 xl:mt-12 relative w-full">
      <BackButton target={`/admin`} />
      <div className="w-full h-10 sm:w-1/2 xl:w-1/3 relative">
        <PopupLink href={"/admin/news/post"} text="Добавить новость"/>
      </div>
      <div className="w-full flex flex-col gap-5 mt-10">
        {!news || news?.length === 0 && (
          <p>Новостей нет...</p>
        )}
        {news && news.length > 0 && news.map((item) => (
          <div key={item.id} className="w-full flex flex-col gap-3 border rounded p-2 text-sm relative bg-primary text-secondary">
            <div>{new Date(item.published_at).toLocaleDateString()}</div>
            <div>{item.title}</div>
            <div>{item.content.substring(0, 200)}...</div>
            <div className="absolute right-5 top-5 flex gap-5 items-center">
              <Link href={`/admin/news/update/${item.id}`}><AiFillEdit size={20} className="link text-white"/></Link>
              <DeleteForm param={item.id} from={"news"}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
