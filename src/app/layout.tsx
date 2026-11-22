import type { Metadata, Viewport } from "next";
import { Cormorant, Golos_Text, JetBrains_Mono, Marck_Script } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { Analytics } from "@/components/analytics/Analytics";
import { getSiteUrl, siteConfig } from "@/config/site";
import { header, meta } from "@/content";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["cyrillic", "latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const golos = Golos_Text({
  variable: "--font-golos",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

const marck = Marck_Script({
  variable: "--font-marck",
  weight: "400",
  subsets: ["cyrillic", "latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: meta.ogTitle,
    description: meta.ogDescription,
    url: "/",
    type: "website",
    locale: "ru_RU",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: meta.ogTitle,
    description: meta.ogDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#F4EEE2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${cormorant.variable} ${golos.variable} ${jetbrains.variable} ${marck.variable}`}
    >
      <body>
        <a
          href="#main"
          className="fixed left-4 top-4 z-100 -translate-y-24 rounded-2 border-2 border-navy-900 bg-orange-500 px-4 py-3 text-[15px] font-semibold text-navy-900 focus:translate-y-0"
        >
          {header.skipLink}
        </a>
        <AppProviders>{children}</AppProviders>
        <Analytics />
      </body>
    </html>
  );
}
