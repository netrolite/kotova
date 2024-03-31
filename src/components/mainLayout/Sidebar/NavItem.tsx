"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/shadcnUtils";
import { buttonVariants } from "@/components/ui/button";
import { NavItem } from "./NavItems";

export default function SidebarNavItem({ href, label }: NavItem) {
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
