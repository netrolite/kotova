import { auth } from "@/auth";
import { DEPENDENT_NAV_ITEMS } from "./Index";
import MobileNavItem from "./NavItem";

export default async function MobileNavProfileNavItem() {
  const session = await auth();
  const navItem = DEPENDENT_NAV_ITEMS.profile(session?.user?.id);

  return <MobileNavItem {...navItem} />;
}
