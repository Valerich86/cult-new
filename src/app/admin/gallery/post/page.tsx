import PostGalleryItemForm from "../../../../components/forms/post-gallery";
import BackButton from "../../../../components/UI/back-button";
import { font_accent } from "../../../../lib/fonts";

export default function PostPhotoPage() {
  return (
    <div className="mt-25 mb-40 xl:mt-12 w-full">
      <BackButton target="/admin/gallery"/>
      <h1 className={`${font_accent.className} text-3xl mb-5`}>
        Добавление работы
      </h1>
      <PostGalleryItemForm />
    </div>
  );
}
