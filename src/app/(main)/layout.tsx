import MainLayoutHeader from "@/components/mainLayout/Header/Index";
import MobileNav from "@/components/mainLayout/MobileNav/Index";
import Sidebar from "@/components/mainLayout/Sidebar/Index";
import { cn } from "@/lib/shadcnUtils";
import { ReactNode } from "react";
import styles from "./layout.module.scss";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex w-full justify-center">
      <Sidebar />
      <main className="flex min-h-screen w-full flex-col md:max-w-[650px] md:border-l md:border-r md:border-slate-200">
        <MainLayoutHeader />
        <div className={cn(styles.mainContentContainer, "flex-grow px-4")}>
          {children}
        </div>
        <MobileNav />
      </main>
    </div>
  );
}
