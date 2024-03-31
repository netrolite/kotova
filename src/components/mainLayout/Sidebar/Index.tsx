import Logo from "@/components/Logo";
import SidebarLinks from "./NavItems";
import { cn } from "@/lib/shadcnUtils";
import styles from "./styles.module.scss";

export default async function Sidebar() {
  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-full w-full max-w-[260px] space-y-2 px-4 md:block",
        styles.sidebar,
      )}
    >
      <div className="mb-4 flex items-center justify-between border-b border-none border-slate-300 px-4">
        <Logo className="max-w-[100px]" />
      </div>
      <SidebarLinks />
    </aside>
  );
}
