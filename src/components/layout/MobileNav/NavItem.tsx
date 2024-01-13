"use client";

import Link from "next/link";
import { NavItemType } from "./Index";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/shadcnUtils";

export default function MobileNavItem({ href, icon, label }: NavItemType) {
  const pathname = usePathname();
  const isActive = href === pathname;
  return (
    <Link key={href} href={href}>
      <li
        className={cn("flex flex-col items-center", isActive && "text-primary")}
      >
        {icon}
        <p className="whitespace-nowrap text-center text-[0.8rem]">{label}</p>
      </li>
    </Link>
  );
}
