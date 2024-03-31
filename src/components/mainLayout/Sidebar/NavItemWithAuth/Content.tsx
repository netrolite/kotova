import { auth } from "@/auth";
import { NavItem } from "../NavItems";
import SidebarNavItem from "../NavItem";

export default async function SidebarNavItemWithAuthContent(props: NavItem) {
  const session = await auth();
  if (!session?.user?.id) return null;
  const href = props.href.replaceAll("{userId}", session.user.id);

  return <SidebarNavItem {...{ ...props, href }} />;
}
