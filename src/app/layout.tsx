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
  title: { default: "SSCICTS | Sri Sumangala College ICT Society", template: "%s | SSCICTS" },
  description:
    "Gaming, quiz, graphic design and Word advertisement competitions by the Sri Sumangala College ICT Society. Register and choose your arena.",
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    title: "SSCICTS | Choose your arena",
    description: "Gaming, quiz, graphic design and Word advertisement competitions by students for students.",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="noise">
        <noscript>
          <style>{"#preloader{display:none!important}"}</style>
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
