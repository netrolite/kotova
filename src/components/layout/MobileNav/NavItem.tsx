import Link from "next/link";
import { NavItemType } from "./Index";

export default function MobileNavItem({ href, icon, label }: NavItemType) {
  return (
    <Link key={href} href={href}>
      <li className="flex flex-col items-center">
        {icon}
        <p className="whitespace-nowrap text-center text-[0.8rem]">{label}</p>
      </li>
    </Link>
  );
}
