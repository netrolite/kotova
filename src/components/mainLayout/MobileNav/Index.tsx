import { ListTodoIcon, LayoutDashboardIcon, UserIcon } from "lucide-react";
import { ReactElement, Suspense } from "react";
import { PanelTopIcon } from "lucide-react";
import MobileNavItem from "./NavItem";
import MobileNavProfileNavItem from "./Profile";
import { cn } from "@/lib/shadcnUtils";
import styles from "./styles.module.scss";

export type NavItemType = {
  href: string;
  label: string;
  icon: ReactElement;
};

const NAV_ITEMS_BASE: NavItemType[] = [
  {
    href: "/",
    label: "Главная",
    icon: <PanelTopIcon />,
  },
  {
    href: "/subjects",
    label: "Тесты",
    icon: <ListTodoIcon />,
  },
  {
    href: "/my",
    label: "Лич. Кабинет",
    icon: <LayoutDashboardIcon />,
  },
];

export const MOBILE_NAVBAR_DEPENDENT_NAV_ITEMS = {
  profile: (userId?: string) => ({
    href: userId ? `/users/${userId}` : "/api/auth/signin",
    label: "Профиль",
    icon: <UserIcon />,
  }),
} as const satisfies Record<
  string,
  NavItemType | ((userId: string) => NavItemType)
>;

export default async function MobileNav() {
  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-20 overflow-auto border-t border-slate-300 bg-white/80 px-4 text-slate-500 backdrop-blur-md md:hidden",
        styles.nav,
      )}
    >
      <ul className="flex justify-around">
        {NAV_ITEMS_BASE.map((navItem) => (
          <MobileNavItem key={navItem.href} {...navItem} />
        ))}
        <Suspense
          fallback={
            <MobileNavItem {...MOBILE_NAVBAR_DEPENDENT_NAV_ITEMS.profile()} />
          }
        >
          <MobileNavProfileNavItem />
        </Suspense>
      </ul>
    </nav>
  );
}
