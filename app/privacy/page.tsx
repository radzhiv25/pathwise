import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import { SiteFooter } from "@/components/landing/site-footer";

export const metadata: Metadata = {
  title: "Privacy Policy - PathWise",
  description: "PathWise privacy policy. How we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 md:py-16 w-full">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: October 2025</p>

          <section className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              PathWise (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered career counseling platform.
            </p>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-foreground">2. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may collect information you provide directly (such as account details, chat conversations, and career-related inputs), information collected automatically (such as usage data and device information), and information from third parties (such as authentication providers) where you choose to sign in with them.
            </p>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-foreground">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use your information to provide and improve our services, personalize your experience, process your requests, send relevant communications, ensure security, and comply with legal obligations. We do not sell your personal information.
            </p>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-foreground">4. Data Security &amp; Storage</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use industry-standard measures to protect your data, including encryption and secure infrastructure. Your chat and account data are stored in accordance with applicable data protection laws.
            </p>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-foreground">5. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              Depending on your location, you may have rights to access, correct, delete, or port your data, and to object to or restrict certain processing. To exercise these rights, please contact us using the details on our <Link href="/contact" className="text-primary underline hover:no-underline">Contact</Link> page.
            </p>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-foreground">6. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <p className="text-muted-foreground text-sm pt-4">
            For questions about this Privacy Policy, see our <Link href="/contact" className="text-primary underline hover:no-underline">Contact</Link> page.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
