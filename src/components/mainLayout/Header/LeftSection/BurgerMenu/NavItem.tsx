"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/shadcnUtils";
import { buttonVariants } from "@/components/ui/button";
import { NavItem } from "@/lib/types/NavItem";
import useContextVal from "@/lib/hooks/contextVal";
import MainLayoutBurgerMenyContext from "@/lib/contexts/mainLayout/BurgerMenu";

export default function MainLayoutHeaderBurgerMenuNavItem({
  href,
  label,
}: NavItem) {
  const pathname = usePathname();
  const { setIsBurgerMenuOpen } = useContextVal(MainLayoutBurgerMenyContext);

  return (
    <li key={href}>
      <Link
        onClick={() => setIsBurgerMenuOpen(false)}
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
