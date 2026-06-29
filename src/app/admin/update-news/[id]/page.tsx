import UpdateNewsForm from "@/components/forms/update-news";
import { getOneNewsItem } from "@/lib/data";
import { font_accent } from "@/lib/fonts";

export default async function UpdateNewsPage(props: {
  params: Promise<{ id: string }>;
}) {
const {id} = await props.params;
const newsItem = await getOneNewsItem(id);

  return (
    <>
      <h1 className={`${font_accent.className} text-3xl mb-5`}>
        Редактирование новости
      </h1>
      {newsItem && <UpdateNewsForm news={newsItem}/>}
      {!newsItem && <div>Ошибка получения данных</div>}
    </>
  );
}
