import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Sidebar from "@/components/routes/layouts/root/Sidebar/Sidebar";
import Header from "@/components/routes/layouts/root/Header/Header";
import { Toaster } from "@/components/ui/sonner";
import MobileNav from "@/components/routes/layouts/root/MobileNav/MobileNav";

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
  const session = await auth();
  return (
    <html lang="ru">
      <SessionProvider {...{ session }}>
        <body>
          <Toaster />

          <div className="flex w-full justify-center">
            <Sidebar />
            <main className="flex min-h-screen w-full flex-col md:max-w-[650px] md:border-l md:border-r md:border-slate-200">
              <Header />
              <div className="flex-grow px-4 pb-3 pt-8">{children}</div>
              <MobileNav />
            </main>
          </div>
        </body>
      </SessionProvider>
    </html>
  );
}
