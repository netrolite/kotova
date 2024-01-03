import { auth } from "@/auth";
import { UserIcon, ListTodoIcon, LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: ReactElement;
};

export default async function MobileNav() {
  const session = await auth();
  const navItems: NavItem[] = [
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
  if (session?.user?.id) {
    navItems.push({
      href: `/users/${session.user.id}`,
      label: "Профиль",
      icon: <UserIcon />,
    });
  }

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-20 border-t border-slate-300 bg-white/80 px-8 py-3 text-slate-500 backdrop-blur-md md:hidden">
      <ul className="flex justify-around">
        {navItems.map(({ href, icon, label }) => (
          <Link key={href} href={href}>
            <li className="flex flex-col items-center">
              {icon}
              <p className="text-center text-sm">{label}</p>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}
