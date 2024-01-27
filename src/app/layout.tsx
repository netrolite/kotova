import type { Metadata } from "next";
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
