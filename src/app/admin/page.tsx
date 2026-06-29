import DeleteNewsForm from "@/components/forms/delete-news";
import { getNews } from "@/lib/data";
import { font_caption } from "@/lib/fonts";
import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";

export default async function AdminPage() {
  const news = await getNews();

  return (
    <div className="">
      <Link
        href={"/admin/post-news"}
        className={`${font_caption.className} text-peachy1 text-xs link animate-pulse`}
      >
        Добавить новость
      </Link>
      <div className="w-full flex flex-col gap-5 mt-10">
        {!news || news.length === 0 && (
          <p>Новостей нет...</p>
        )}
        {news && news.length > 0 && news.map((item) => (
          <div key={item.id} className="w-full flex flex-col gap-3 border rounded p-2 text-sm relative">
            <div>{new Date(item.published_at).toLocaleDateString()}</div>
            <div>{item.title}</div>
            <div>{item.content.substring(0, 200)}...</div>
            <div className="absolute right-5 top-5 flex gap-5 items-center">
              <Link href={`/admin/update-news/${item.id}`}><AiFillEdit size={20} className="link text-white"/></Link>
              <DeleteNewsForm id={item.id}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
