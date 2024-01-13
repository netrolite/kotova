import {
  LayoutDashboardIcon,
  ListTodoIcon,
  PanelTopIcon,
  UserIcon,
} from "lucide-react";
import { NavItemType } from "../MobileNav/Index";
import SidebarNavItem from "./NavItem";
import { Suspense } from "react";
import SidebarProfileNavItem from "./Profile";

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

export const SIDEBAR_DEPENDENT_NAV_ITEMS = {
  profile: (userId?: string) => ({
    href: `/users/${userId || ""}`,
    label: "Профиль",
    icon: <UserIcon />,
  }),
} as const satisfies Record<
  string,
  NavItemType | ((userId: string) => NavItemType)
>;

export default async function SidebarLinks() {
  return (
    <nav className="flex flex-col gap-1">
      <ul>
        {NAV_ITEMS_BASE.map((navItem) => (
          <SidebarNavItem key={navItem.href} {...navItem} />
        ))}
        <Suspense
          fallback={
            <SidebarNavItem {...SIDEBAR_DEPENDENT_NAV_ITEMS.profile()} />
          }
        >
          <SidebarProfileNavItem />
        </Suspense>
      </ul>
    </nav>
  );
}
