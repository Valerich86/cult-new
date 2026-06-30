import { Metadata } from "next";
import Draining from "@/components/animation/draining";
import { font_accent, font_caption } from "@/lib/fonts";
import BackButton from "@/components/UI/back-button";
import ImageBlock from "@/components/UI/image-block";
import TextBlock from "@/components/UI/text-block";
import { getOneNewsItem } from "@/lib/data";
import Link from "next/link";
import Decor from "@/components/UI/decor";

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const newsItem = await getOneNewsItem(id);

  return {
    title: `Полный текст новости | ${newsItem?.title}`,
    description: `${newsItem?.title}. ${newsItem?.content.substring(0, 50)}`,
  };
}

export default async function NewsItemPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const newsItem = await getOneNewsItem(id);
  if (!newsItem) {
    throw new Error();
  }

  return (
    <main
      className="x-spacing flex flex-col gap-10 pb-25 relative"
      aria-label={`Полный текст новости ${newsItem?.title}`}
      id={newsItem?.id}
    >
      <BackButton target={`/#${newsItem?.id}`} />
      <Draining length={5} />
      <Decor />
      <div className="w-full">
        <div
          className={`w-full flex ${font_accent.className} text-5xl sm:text-6xl min-h-[50vh] items-center`}
        >
          {newsItem.title}
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-5 items-stretch">
          <div className="w-full lg:w-1/2">
            <TextBlock
              text={newsItem.content}
              options="bg-secondary text-brown text-sm"
            />
            {newsItem.link_href && (
              <div className="w-full flex justify-end pr-5">
                <Link
                  href={newsItem.link_href}
                  target="_blank"
                  className={`${font_caption.className} text-xl animate-pulse text-peachy2 mt-5`}
                >
                  {newsItem.link_name}
                </Link>
              </div>
            )}
          </div>
          <div className="w-full lg:w-1/2">
            {newsItem.media_type === "image" && (
              <ImageBlock
                src={newsItem.media_url}
                alt={`Изображение к новости ${newsItem.media_url}`}
                position="top"
              />
            )}
            {newsItem.media_type === "video" && (
              <video
                className="object-cover h-full w-full grayscale-90"
                muted
                autoPlay
                playsInline
                loop
              >
                <source src={newsItem.media_url} />
              </video>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
