"use client";

import { usePathname } from "next/navigation";
import { NavItemType } from "../MobileNav/Index";
import Link from "next/link";
import { cn } from "@/lib/shadcnUtils";
import { buttonVariants } from "@/components/ui/button";

export default function SidebarNavItem({ href, icon, label }: NavItemType) {
  const pathname = usePathname();

  return (
    <li key={href}>
      <Link
        href={href}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          pathname === href
            ? "bg-muted hover:bg-muted"
            : "hover:bg-transparent",
          "w-full justify-start text-lg hover:text-primary hover:underline",
        )}
      >
        {label}
      </Link>
    </li>
  );
}
