import Navbar from "@/components/common/Navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { LandingShowcase } from "@/components/landing/landing-showcase";
import { SiteFooter } from "@/components/landing/site-footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <LandingShowcase />
      </main>
      <SiteFooter />
    </div>
  );
}
