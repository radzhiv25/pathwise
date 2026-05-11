import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import { SiteFooter } from "@/components/landing/site-footer";

export const metadata: Metadata = {
  title: "Terms of Service - PathWise",
  description: "PathWise terms of service. Rules and guidelines for using our career counseling platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 md:py-16 w-full">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: October 2025</p>

          <section className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using PathWise, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-foreground">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              PathWise provides AI-powered career counseling and guidance. Our service is for informational and educational purposes and does not replace professional career, legal, or financial advice.
            </p>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-foreground">3. Your Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to use PathWise only for lawful purposes, to provide accurate information, to keep your account credentials secure, and not to misuse, abuse, or attempt to compromise the service or other users.
            </p>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-foreground">4. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              PathWise and its content, features, and functionality are owned by us and are protected by intellectual property laws. You may not copy, modify, or create derivative works without our permission.
            </p>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-foreground">5. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              PathWise is provided &quot;as is&quot; and &quot;as available&quot;. We do not guarantee that the service will be uninterrupted, error-free, or that advice provided by the AI is accurate or suitable for your situation. You use the service at your own risk.
            </p>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-foreground">6. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the fullest extent permitted by law, PathWise and its operators shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.
            </p>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-foreground">7. Changes</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may modify these terms at any time. Continued use of PathWise after changes constitutes acceptance of the updated terms. We encourage you to review this page periodically.
            </p>
          </section>

          <p className="text-muted-foreground text-sm pt-4">
            For questions about these Terms, see our <Link href="/contact" className="text-primary underline hover:no-underline">Contact</Link> page.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
