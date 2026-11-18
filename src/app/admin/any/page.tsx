import Image from "next/image";
import { FaExchangeAlt } from "react-icons/fa";
import { getGallery } from "../../../lib/cloud";
import { font_accent } from "../../../lib/fonts";
import BackButton from "../../../components/UI/back-button";
import BtnTop from "../../../components/UI/btn-top";
import Link from "next/link";

export default async function AdminAny() {
  const urls = await getGallery("tech");

  return (
    <div className="mt-25 xl:mt-12 mb-40 relative w-full">
      <BackButton target={`/admin`} />
      <h2 className={`${font_accent.className} mb-10`}>
        {"Эти фото можно заменить"}
      </h2>
      <div className="w-full flex flex-col gap-5 mt-10">
        {urls?.length === 0 ? (
          <p>Ничего не найдено, всё сломано...</p>
        ) : (
          <div className="w-full flex flex-wrap justify-between gap-5">
            {urls.map((url: string, index: number) => {
              const ext = url.split(".")[4];
              const type = ["mp4", "mov", "webm"].includes(ext)
                ? "video"
                : "image";
                console.log(`${url}:`, type)
              return (
                <div
                  className="relative w-full md:w-75 h-100 bg-primary shadow"
                  key={index}
                >
                  {type === "image" ? (
                    <Image
                      src={url}
                      alt={`Изображение URL=${url} не загружается.`}
                      loading="lazy"
                      fill
                      sizes="100%"
                      className={`object-contain`}
                    />
                  ) : (
                    <video
                      className={`object-contain`}
                      muted
                      playsInline
                      controls
                    >
                      <source src={url} type={`video/${ext}`} />
                    </video>
                  )}
                  <Link
                    href={`/admin/any/put?url=${url}`}
                    className="absolute right-0 top-0"
                  >
                    <FaExchangeAlt />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <BtnTop />
    </div>
  );
}
