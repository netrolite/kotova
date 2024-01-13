import { auth } from "@/auth";
import { MOBILE_NAVBAR_DEPENDENT_NAV_ITEMS } from "./Index";
import MobileNavItem from "./NavItem";

export default async function MobileNavProfileNavItem() {
  const session = await auth();
  const navItem = MOBILE_NAVBAR_DEPENDENT_NAV_ITEMS.profile(session?.user?.id);

  return <MobileNavItem {...navItem} />;
}
