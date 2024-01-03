"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/shadcnUtils";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ROLE, Role } from "@/lib/types/enums/Role";

type Props = {
  className?: string;
  userRole: null | Role;
};

export default function SidebarLinks({ className, userRole }: Props) {
  const session = useSession();
  const pathname = usePathname();
  const links = [{ title: "Тесты", href: "/subjects" }];
  if (userRole === ROLE.TEACHER) {
    links.push({ title: "Мои классы", href: "/my/classes" });
  }
  if (session?.data?.user?.id) {
    links.unshift({ title: "Личный кабинет", href: "/my" });
    links.unshift({
      href: `/users/${session.data.user.id}`,
      title: "Мой профиль",
    });
  }

  return (
    <nav className={cn("flex flex-col gap-1", className)}>
      <ul>
        {links.map((item) => (
          <li key={item.href}>
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-transparent hover:underline",
                "w-full justify-start text-lg",
              )}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
