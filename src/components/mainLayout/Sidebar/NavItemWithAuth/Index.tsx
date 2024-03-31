import { Suspense } from "react";
import SidebarNavItemWithAuth from "./Content";
import { NavItem } from "../NavItems";
import SidebarNavItemWithAuthFallback from "./Fallback";

export default function SidevarNavItemWithAuth(props: NavItem) {
  return (
    <Suspense fallback={<SidebarNavItemWithAuthFallback />}>
      <SidebarNavItemWithAuth {...props} />
    </Suspense>
  );
}
