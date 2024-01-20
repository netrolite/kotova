import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Header from "@/components/layout/Header/Header";
import MobileNav from "@/components/layout/MobileNav/Index";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import isProduction from "@/lib/isProduction";

export const metadata: Metadata = {
  title: {
    template: "%s | Kotova",
    default: "Kotova",
  },
  description: "TODO",
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

        <div className="flex w-full justify-center">
          <Sidebar />
          <main className="flex min-h-screen w-full flex-col md:max-w-[650px] md:border-l md:border-r md:border-slate-200">
            <Header />
            <div className="flex-grow px-4 py-24 md:py-8">{children}</div>
            <MobileNav />
          </main>
        </div>
      </body>
    </html>
  );
}
