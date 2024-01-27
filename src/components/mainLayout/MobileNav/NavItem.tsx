"use client";

import Link from "next/link";
import { NavItemType } from "./Index";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/shadcnUtils";

export default function MobileNavItem({ href, icon, label }: NavItemType) {
  const pathname = usePathname();
  const isActive = href === pathname;
  return (
    <li
      className={cn(
        isActive && "text-primary [&_p]:drop-shadow-[0.8px_0px_0px_#1b54e3]",
      )}
    >
      <Link
        key={href}
        href={href}
        className="flex flex-col items-center hover:no-underline"
      >
        {icon}
        <p className={cn(`whitespace-nowrap text-center text-[0.8rem] `)}>
          {label}
        </p>
      </Link>
    </li>
  );
}
