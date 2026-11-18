import Image from "next/image";
import { getGallery } from "../../../lib/cloud";
import { font_accent } from "../../../lib/fonts";
import BackButton from "../../../components/UI/back-button";
import { mastersInfo } from "../../../lib/text";
import type { MasterInfo } from "../../../lib/utils";
import PopupLink from "../../../components/UI/popup-link";
import BtnTop from "../../../components/UI/btn-top";
import DeleteForm from "../../../components/forms/delete";

type MasterGallery = {
  master: MasterInfo;
  urls: string[];
};

export default async function AdminGallery() {
  let gallery: MasterGallery[] = [];
  for (const m of mastersInfo) {
    const photos = await getGallery(m.folder);
    gallery.push({ master: m, urls: photos });
  }

  return (
    <div className="mt-25 xl:mt-12 mb-40 relative w-full">
      <BackButton target={`/admin`} />
      <div className="w-full h-10 sm:w-1/2 xl:w-1/3 relative">
        <PopupLink href={"/admin/gallery/post"} text="Добавить фото" />
      </div>
      <div className="w-full flex flex-col gap-5 mt-10">
        {gallery?.length === 0 ? (
          <p>Галерея пуста...</p>
        ) : (
          <div className="w-full space-y-20">
            {gallery.map((m: MasterGallery) => (
              <div key={m.master.slug}>
                <h2 className={`${font_accent.className} mb-10`}>
                  {m.master.name}
                </h2>
                <div className="w-full flex flex-wrap justify-between gap-5">
                  {m.urls.length > 0 ? (
                    m.urls.map((url: string) => (
                      <div
                        className="relative w-36 h-28 bg-primary shadow"
                        key={url}
                      >
                        <Image
                          src={url}
                          alt={`Изображение URL=${url} не загружается.`}
                          loading="lazy"
                          fill
                          sizes="100%"
                          className={`object-contain`}
                        />
                        <div className="absolute right-0 top-0">
                          <DeleteForm param={url} from={"gallery"} />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Работы этого мастера не найдены...</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <BtnTop />
    </div>
  );
}
