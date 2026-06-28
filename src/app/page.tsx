import Section1 from "@/components/sections/section-1";
import Section2 from "@/components/sections/section-2";
import Section3 from "@/components/sections/section-3";
import Section4 from "@/components/sections/section-4";
import { getGallery } from "@/lib/cloud";

const folders = ["tan", "sonya", "arthur"] as const; // const-assertion фиксирует литералы

type Folder = (typeof folders)[number];

export default async function Home() {
  const gallery: Record<
    Folder,
    Awaited<ReturnType<typeof getGallery>>
  > = {} as any;

  for (const folder of folders) {
    gallery[folder] = await getGallery(folder);
  }

  return (
    <main className="lg:px-50 flex flex-col gap-2 pb-25" aria-label="Главная">
      <Section1 />
      <div className="px-5 lg:px-0">
        <Section2 />
        {gallery && <Section3 gallery={gallery}/>}
        <Section4 />
      </div>
    </main>
  );
}
