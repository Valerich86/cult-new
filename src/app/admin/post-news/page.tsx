import PostNewsForm from "@/components/forms/post-news";
import BackButton from "@/components/UI/back-button";
import { font_accent } from "@/lib/fonts";

export default function PostNewsPage() {
  return (
    <>
      <BackButton target="/admin" color="peachy1"/>
      <h1 className={`${font_accent.className} text-3xl mb-5`}>
        Добавление новости
      </h1>
      <PostNewsForm />
    </>
  );
}
