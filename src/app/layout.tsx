import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import isProduction from "@/lib/isProduction";

export const metadata: Metadata = {
  title: {
    template: "%s | Kotova",
    default: "Kotova",
  },
  description: "Сайт учителя русского языка и литературы Котовой Виктории",
  manifest: "/manifest.json",
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? "https://${process.env.VERCEL_URL}"
      : `http://localhost:${process.env.PORT || 3000}`,
  ),
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  viewportFit: "cover", // needed for css env variables like safe-area-inset-bottom to work
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Toaster />

        {isProduction() && (
          <>
            <SpeedInsights />
            <Analytics />
          </>
        )}

        {children}
      </body>
    </html>
  );
}
