import SidebarNavItem from "./NavItem";
import SidebarNavItemWithAuth from "./NavItemWithAuth/Index";
import { NAV_ITEMS } from "@/lib/constants";

export default async function SidebarLinks() {
  return (
    <nav className="flex flex-col gap-1">
      <ul>
        {NAV_ITEMS.map((navItem, i) => {
          if (navItem.requiresAuth) {
            return <SidebarNavItemWithAuth key={i} {...navItem} />;
          }
          return <SidebarNavItem key={i} {...navItem} />;
        })}
      </ul>
    </nav>
  );
}
