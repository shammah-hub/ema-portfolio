import type { Metadata, Viewport } from "next";
import "./globals.css";
import { body, display, mono, serif } from "./components/portfolio/fonts";
import { Providers } from "./components/portfolio/Providers";
import { INDEXABLE, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "./components/portfolio/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s | Ema Tosin" },
  description: SITE_DESCRIPTION,
  robots: INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { type: "website", siteName: "Ema Tosin", title: SITE_TITLE, description: SITE_DESCRIPTION },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
};
export const viewport: Viewport = { themeColor: "#fbfaf6" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} ${serif.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
