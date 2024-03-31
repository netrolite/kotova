import {
  InfoIcon,
  LayoutDashboardIcon,
  ListTodoIcon,
  PanelTopIcon,
  UserIcon,
} from "lucide-react";
import SidebarNavItem from "./NavItem";
import SidebarNavItemWithAuth from "./NavItemWithAuth/Index";
import { ReactElement } from "react";

export type NavItem = {
  href: string;
  label: string;
  icon: ReactElement;
  requiresAuth?: boolean;
};

const NAV_ITEMS: NavItem[] = [
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
    label: "Личный Кабинет",
    icon: <LayoutDashboardIcon />,
  },
  {
    href: "/users/{userId}",
    label: "Мой Профиль",
    icon: <UserIcon />,
    requiresAuth: true,
  },
  {
    href: "/about",
    label: "О сайте",
    icon: <InfoIcon />,
  },
];

export default async function SidebarLinks() {
  return (
    <nav className="flex flex-col gap-1">
      <ul>
        {NAV_ITEMS.map((navItem) => {
          if (navItem.requiresAuth) {
            return <SidebarNavItemWithAuth {...navItem} />;
          }
          return <SidebarNavItem key={navItem.href} {...navItem} />;
        })}
      </ul>
    </nav>
  );
}
