import MainLayoutHeaderLeftSection from "./LeftSection/Index";
import MainLayoutHeaderRightSection from "./RightSection/Index";
import MainLayoutHeaderMiddleSection from "./MiddleSection";
import { cn } from "@/lib/shadcnUtils";
import styles from "./styles.module.scss";

export default function MainLayoutHeader() {
  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-20 grid grid-cols-3 border-b border-slate-300 bg-white/80 px-4 backdrop-blur-md md:sticky",
        styles.header,
      )}
    >
      <MainLayoutHeaderLeftSection />
      <MainLayoutHeaderMiddleSection />
      <MainLayoutHeaderRightSection />
    </header>
  );
}
