import type { Metadata, Viewport } from "next";
import "./globals.scss";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import isProduction from "@/lib/isProduction";

const APP_NAME = "Kotova";
const APP_DEFAULT_TITLE = "Kotova";
const APP_TITLE_TEMPLATE = "%s - Kotova";
const APP_DESCRIPTION =
  "Сайт учителя русского языка и литературы Котовой Виктории";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    template: APP_TITLE_TEMPLATE,
    default: APP_DEFAULT_TITLE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? "https://${process.env.VERCEL_URL}"
      : `http://localhost:${process.env.PORT || 3000}`,
  ),
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  viewportFit: "cover", // needed for css env variables like safe-area-inset-bottom to work
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // disable zooming because it's disgusting
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
