import { SceneLayer } from "@/components/three/SceneLayer";
import { HeroSection } from "@/components/home/HeroSection";
import { DisciplineMarquee } from "@/components/home/DisciplineMarquee";
import { SelectedWork } from "@/components/home/SelectedWork";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { homePoses } from "@/lib/scene";

export default function HomePage() {
  return (
    <>
      <SceneLayer poses={homePoses} />
      <div className="relative z-10">
        <HeroSection />
        <DisciplineMarquee />
        <SelectedWork />
        <AboutPreview />
        <ServicesSection />
        <ProcessSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
    </>
  );
}
