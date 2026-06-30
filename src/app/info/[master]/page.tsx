import { Metadata } from "next";
import { getGallery } from "@/lib/cloud";
import GalleryItem from "@/components/UI/gallery-item";
import Draining from "@/components/animation/draining";
import { font_accent } from "@/lib/fonts";
import BackButton from "@/components/UI/back-button";
import ImageBlock from "@/components/UI/image-block";
import { mastersInfo } from "@/lib/text";
import TextBlock from "@/components/UI/text-block";
import Decor from "@/components/UI/decor";

export async function generateMetadata(props: {
  params: Promise<{ master: string }>;
}): Promise<Metadata> {
  const { master } = await props.params;
  const text =
    master === "tan"
      ? "Андрей Тарасов"
      : master === "sonya"
        ? "Соня Вафлина"
        : "Артур Эккерт";

  return {
    title: `Подробнее о мастере | ${text}`,
    description: `${text}. Посмотрите реальные работы тату-мастера и запишитесь к нему на сеанс.`,
  };
}

export default async function InfoPage(props: {
  params: Promise<{ master: string }>;
}) {
  const { master } = await props.params;
  const info =
    master === "tan"
      ? mastersInfo[0]
      : master === "sonya"
        ? mastersInfo[1]
        : mastersInfo[2];
  const photos = await getGallery(master);

  return (
    <main
      className="x-spacing flex flex-col gap-10 pb-25 lg:py-10 relative"
      aria-label={`Информация о мастере ${master}`}
      id="gallery"
    >
      <BackButton target={`/#${master}`} />
      <Draining />
      <Decor />
      <div
        className="w-full h-screen lg:h-[50vh] flex flex-col lg:flex-row"
        id="masters"
      >
        <div
          className={`lg:w-1/2 w-full h-screen lg:h-full ${font_accent.className} 
            lg:mr-2  text-6xl flex items-center justify-center lg:justify-start`}
        >
          {info.name}
        </div>
        <div className="lg:w-1/2 w-full h-screen lg:h-full relative bg-primary border-4 border-primary">
          <ImageBlock src={info.src} alt={info.alt} priority />
        </div>
      </div>
      <div className="w-full min-h-screen lg:min-h-[50vh]">
        <TextBlock text={info.about} />
      </div>
      <div className="w-full flex flex-wrap justify-center gap-5 sm:justify-between z-50">
        {photos?.map((url, i) => (
          <div className="relative w-36 h-28" key={i}>
            <GalleryItem
              src={url}
              rotate={Math.floor(Math.random() * 20) - 10}
              containerId="gallery"
              animateOnce
            />
          </div>
        ))}
      </div>
    </main>
  );
}
