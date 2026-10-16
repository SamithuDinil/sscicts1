import type { Metadata, Viewport } from "next";
import "@fontsource/chakra-petch/500.css";
import "@fontsource/chakra-petch/600.css";
import "@fontsource/chakra-petch/700.css";
import "@fontsource-variable/hanken-grotesk";
import "./globals.css";
import Providers from "@/components/Providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sscicts.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "SSCICTS · Cypher ’27 | Sri Sumangala College ICT Society", template: "%s | SSCICTS" },
  description:
    "Cypher ’27 — Inter-school & Intra-school competitions: Video Editing, Web Designing, Graphic Designing, Minecraft, Word Ads & AI Ads. Register on this site.",
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    title: "SSCICTS · Cypher ’27 | Choose your arena",
    description: "Inter & Intra school competitions by the Sri Sumangala College ICT Society. Register via the website.",
    type: "website",
    siteName: "SSCICTS",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#07110f",
  width: "device-width",
  initialScale: 1,
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('sscicts-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.classList.add(t)}catch(e){document.documentElement.classList.add('dark')}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="noise">
        <noscript>
          <style>{"#preloader{display:none!important}"}</style>
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
