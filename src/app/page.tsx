import { getCloudPath, getGallery } from "@/lib/cloud";
import HeroSection from "@/components/sections/hero";
import AboutSection1 from "@/components/sections/about-1";
import AboutSection2 from "@/components/sections/about-2";
import MastersSection from "@/components/sections/masters";
import ActionSection from "@/components/sections/action";
import FaqSection from "@/components/sections/faq";
import LivingTattooSection from "@/components/sections/living-tattoo";
import Draining from "@/components/animation/draining";

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

  const cloudPath = getCloudPath();

  return (
    <main
      className="xl:px-50 sm:px-25 flex flex-col gap-10 pb-25 relative"
      aria-label="Главная"
    >
      <div className="absolute top-0 right-0 w-50 hidden lg:flex">
        <Draining length={5}/>
      </div>
      <HeroSection />
      <div className="px-5 xl:px-0 sm:px-0 flex flex-col gap-10">
        <AboutSection1 cloudPath={cloudPath}/>
        <AboutSection2 cloudPath={cloudPath}/>
        {gallery && <MastersSection gallery={gallery} cloudPath={cloudPath}/>}
        <LivingTattooSection />
        <FaqSection cloudPath={cloudPath}/>
        <ActionSection />
      </div>
    </main>
  );
}
