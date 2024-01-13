import { auth } from "@/auth";
import { SIDEBAR_DEPENDENT_NAV_ITEMS } from "./NavItems";
import SidebarNavItem from "./NavItem";

export default async function SidebarProfileNavItem() {
  const session = await auth();
  const navItem = SIDEBAR_DEPENDENT_NAV_ITEMS.profile(session?.user?.id);

  return <SidebarNavItem {...navItem} />;
}
