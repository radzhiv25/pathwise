import Navbar from "@/components/common/Navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { DemoSection } from "@/components/landing/demo-section";
import { TechStackSection } from "@/components/landing/tech-stack-section";
import { CTASection } from "@/components/landing/cta-section";
import { SiteFooter } from "@/components/landing/site-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <DemoSection />
        <TechStackSection />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
