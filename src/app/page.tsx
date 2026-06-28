import { getGallery } from "@/lib/cloud";
import HeroSection from "@/components/sections/hero";
import AboutSection1 from "@/components/sections/about-1";
import AboutSection2 from "@/components/sections/about-2";
import MastersSection from "@/components/sections/masters";
import ActionSection from "@/components/sections/action";
import FaqSection from "@/components/sections/faq";
import LivingTattooSection from "@/components/sections/living-tattoo";

const folders = ["tan", "sonya", "arthur"] as const; // const-assertion фиксирует литералы

type Folder = (typeof folders)[number];

export default async function Home() {
  const gallery: Record<
    Folder,
    Awaited<ReturnType<typeof getGallery>>
  > = {} as any;

  for (const folder of folders) {
    gallery[folder] = await getGallery(folder, 10);
  }

  return (
    <main className="lg:px-50 flex flex-col gap-4 pb-25" aria-label="Главная">
      <HeroSection />
      <div className="px-5 lg:px-0 flex flex-col gap-4">
        <AboutSection1 />
        <AboutSection2 />
        {gallery && <MastersSection gallery={gallery}/>}
        {/* <LivingTattooSection /> */}
        <FaqSection />
        <ActionSection />
      </div>
    </main>
  );
}
