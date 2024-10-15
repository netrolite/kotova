"use client";

import ReactStateSetter from "@/lib/types/SetState";
import { createContext } from "react";
import {
  InfoIcon,
  LayoutDashboardIcon,
  ListTodoIcon,
  PanelTopIcon,
  UserIcon,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import MainLayoutHeaderBurgerMenuNavItem from "./NavItem";
import { NavItem } from "@/lib/types/NavItem";
import MainLayoutHeaderBurgerMenuNavItemWithAuthContent from "./NavItemWithAuth/Index";

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

export type MainLayoutBurgerMenyContextType = {
  isBurgerMenuOpen: boolean;
  setIsBurgerMenuOpen: ReactStateSetter<boolean>;
};
export const MainLayoutBurgerMenyContext =
  createContext<MainLayoutBurgerMenyContextType | null>(null);

export default function MainLayoutHeaderLeftSectionBurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MainLayoutBurgerMenyContext.Provider
      value={{ isBurgerMenuOpen: isOpen, setIsBurgerMenuOpen: setIsOpen }}
    >
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button className="md:hidden">
            <MenuIcon />
          </button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="pt-10 data-[state=open]:duration-300"
        >
          <nav>
            <ul>
              {NAV_ITEMS.map((props, i) => {
                if (props.requiresAuth) {
                  return (
                    <MainLayoutHeaderBurgerMenuNavItemWithAuthContent
                      key={i}
                      {...props}
                    />
                  );
                }
                return <MainLayoutHeaderBurgerMenuNavItem key={i} {...props} />;
              })}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </MainLayoutBurgerMenyContext.Provider>
  );
}