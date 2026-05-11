import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { Mail } from "lucide-react";

const CONTACT_EMAIL = "rajeevkrishna.work@gmail.com";

export const metadata: Metadata = {
  title: "Contact - PathWise",
  description: "Get in touch with the PathWise team for support and inquiries.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 md:py-16 w-full">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold text-foreground mb-2">Contact Us</h1>
          <p className="text-muted-foreground mb-8">
            Have a question, feedback, or need support? We&apos;d love to hear from you.
          </p>

          <section className="space-y-6 mb-8 p-6 rounded-lg border border-border bg-card text-card-foreground">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Mail className="size-5 text-primary" />
              Email
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              For general inquiries, privacy requests, or terms-related questions, reach us at:
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="text-sm text-muted-foreground">
              We aim to respond within a few business days.
            </p>
          </section>

          <p className="text-muted-foreground text-sm">
            You can also find our <Link href="/privacy" className="text-primary underline hover:no-underline">Privacy Policy</Link> and <Link href="/terms" className="text-primary underline hover:no-underline">Terms of Service</Link> for more information.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
