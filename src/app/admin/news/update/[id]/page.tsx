import UpdateNewsForm from "../../../../../components/forms/update-news";
import BackButton from "../../../../../components/UI/back-button";
import { getOneNewsItem } from "../../../../../lib/data";
import { font_accent } from "../../../../../lib/fonts";

export default async function UpdateNewsPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const newsItem = await getOneNewsItem(id);

  return (
    <div className="mt-25 xl:mt-12 mb-40 w-full">
      <BackButton target="/admin/news" />
      <h1 className={`${font_accent.className} text-3xl mb-5`}>
        Редактирование новости
      </h1>
      {newsItem && <UpdateNewsForm news={newsItem} />}
      {!newsItem && <div>Ошибка получения данных</div>}
    </div>
  );
}
