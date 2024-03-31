import { Suspense } from "react";
import SidebarNavItemWithAuthContent from "./Content";
import SidebarNavItemWithAuthFallback from "./Fallback";
import { NavItem } from "@/lib/types/NavItem";

export default function SidebarNavItemWithAuth(props: NavItem) {
  return (
    <Suspense fallback={<SidebarNavItemWithAuthFallback />}>
      <SidebarNavItemWithAuthContent {...props} />
    </Suspense>
  );
}
