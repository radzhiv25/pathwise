import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
    url: "https://pathwise.app",
    title: "PathWise - AI-Powered Career Guidance",
    description: "Transform your career journey with AI-powered counseling, personalized guidance, and data-driven insights.",
    siteName: "PathWise",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PathWise - AI-Powered Career Guidance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PathWise - AI-Powered Career Guidance",
    description: "Transform your career journey with AI-powered counseling and personalized guidance.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full h-full">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
