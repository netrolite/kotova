import { auth } from "@/auth";
import { NavItem } from "../NavItems";
import SidebarNavItem from "../NavItem";

export default async function SidebarNavItemWithAuthContent(props: NavItem) {
  const session = await auth();
  if (!session) return null;

  return <SidebarNavItem {...props} />;
}
