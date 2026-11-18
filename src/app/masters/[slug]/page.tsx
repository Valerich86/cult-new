import { Metadata } from "next";
import { getGallery } from "../../../lib/cloud";
import GalleryItem from "../../../components/UI/gallery-item";
import Draining from "../../../components/animation/draining";
import { font_accent } from "../../../lib/fonts";
import BackButton from "../../../components/UI/back-button";
import ImageBlock from "../../../components/UI/image-block";
import { mastersInfo } from "../../../lib/text";
import TextBlock from "../../../components/UI/text-block";
import Decor from "../../../components/UI/decor";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  let masterName;
  mastersInfo.forEach((m) => {
    if (slug === m.slug) masterName = m.name;
  });

  return {
    title: `Мастер ${masterName}`,
    description: `Реальные работы и информация о мастере ${masterName}.`,
  };
}

export default async function InfoPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  let info = mastersInfo[0];
  mastersInfo.forEach((m) => {
    if (slug === m.slug) info = m;
  });
  const photos = await getGallery(info?.folder);

  return (
    <main
      className="x-spacing flex flex-col gap-10 pb-40 lg:pt-10 relative overflow-hidden"
      aria-label={`Информация о мастере ${info.name}`}
      id="gallery"
    >
      <BackButton target={`/#${info.slug}`} />
      <Draining />
      <Decor count={10} />
      <div
        className="w-full h-screen lg:h-[50vh] flex flex-col lg:flex-row"
        id="masters"
      >
        <div
          className={`lg:w-1/2 w-full h-screen lg:h-full ${font_accent.className} 
            lg:mr-2 text-4xl sm:text-5xl lg:text-6xl flex items-center`}
        >
          {info.name}
        </div>
        <div className="lg:w-1/2 w-full h-screen lg:h-full relative bg-primary border-4 border-primary">
          <ImageBlock src={info.src} alt={info.alt} priority />
        </div>
      </div>
      <div className="w-full">
        <TextBlock text={info.about} />
      </div>
      <div className="w-full flex flex-wrap justify-center gap-5 sm:justify-between z-50">
        {photos?.map((url: string, i: number) => (
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
