import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Sidebar from "@/components/routes/layouts/root/Sidebar/Sidebar";
import Header from "@/components/routes/layouts/root/Header/Header";
import { Toaster } from "@/components/ui/sonner";

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
        <body className="min-h-screen">
          <Toaster />
          <div className="flex w-full justify-center">
            <Sidebar />
            <main className="min-h-screen w-full md:max-w-[650px] md:border-l md:border-r md:border-slate-200">
              <Header />
              <div className="px-4 py-3">{children}</div>
            </main>
          </div>
        </body>
      </SessionProvider>
    </html>
  );
}
