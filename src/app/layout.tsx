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
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
