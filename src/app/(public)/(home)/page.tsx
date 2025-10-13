import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import AboutSection from "@/components/home/AboutSection";
import PricingSection from "@/components/home/PricingSection";
import TutorialsSection from "@/components/home/TutorialsSection";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <ScrollReveal>
        <FeaturesSection />
      </ScrollReveal>

      <ScrollReveal>
        <AboutSection />
      </ScrollReveal>

      <ScrollReveal>
        <PricingSection />
      </ScrollReveal>
      
      <ScrollReveal>
        <TutorialsSection />
      </ScrollReveal>
    </>
  );
}