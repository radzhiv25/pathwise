import type { Metadata } from "next";
import { Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import { cn } from "@/lib/utils";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://pathwise.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "PathWise - AI-Powered Career Guidance",
  description: "Transform your career journey with AI-powered counseling, personalized guidance, and data-driven insights to help you make informed career decisions.",
  keywords: ["career counseling", "AI guidance", "career planning", "professional development", "job search", "career advice"],
  authors: [{ name: "PathWise Team" }],
  creator: "PathWise",
  publisher: "PathWise",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "PathWise - AI-Powered Career Guidance",
    description:
      "Transform your career journey with AI-powered counseling, personalized guidance, and data-driven insights.",
    siteName: "PathWise",
  },
  twitter: {
    card: "summary_large_image",
    title: "PathWise - AI-Powered Career Guidance",
    description:
      "Transform your career journey with AI-powered counseling and personalized guidance.",
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("w-full h-full font-sans", spaceGrotesk.variable, geistMono.variable)}
    >
      <head>
        <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-48.png" type="image/png" sizes="48x48" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
      </head>
      <body className="antialiased w-full h-full">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
