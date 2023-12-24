"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/shadcnUtils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  className?: string;
};

type Link = {
  href: string;
  title: string;
};

const LINKS = [
  { title: "Личный кабинет", href: "/my" },
  { title: "Мои классы", href: "/my/classes" },
  { title: "Тесты", href: "/tests" },
] satisfies Link[];

export default function SidebarLinks({ className }: Props) {
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className,
      )}
    >
      {LINKS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start text-lg",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
