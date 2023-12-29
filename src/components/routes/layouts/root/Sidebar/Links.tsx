"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/shadcnUtils";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

type Props = {
  className?: string;
};

type Link = {
  href: string;
  title: string;
};

export default function SidebarLinks({ className }: Props) {
  const session = useSession();
  const pathname = usePathname();
  const LINKS = [
    { title: "Личный кабинет", href: "/my" },
    { title: "Мои классы", href: "/my/classes" },
    { title: "Тесты", href: "/tests" },
  ];
  if (session?.data?.user?.id) {
    LINKS.unshift({
      href: `/users/${session.data.user.id}`,
      title: "Мой профиль",
    });
  }

  return (
    <nav className={cn("flex flex-col gap-1", className)}>
      <ul>
        {LINKS.map((item) => (
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
