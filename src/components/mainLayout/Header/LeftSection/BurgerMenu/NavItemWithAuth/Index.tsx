import { NavItem } from "@/lib/types/NavItem";
import { useSession } from "next-auth/react";
import MainLayoutHeaderBurgerMenuNavItem from "../NavItem";

export default function MainLayoutHeaderBurgerMenuNavItemWithAuthContent(
  props: NavItem,
) {
  const { data: session } = useSession();
  if (!session?.user?.id) return null;
  const href = props.href.replaceAll("{userId}", session.user.id);

  return <MainLayoutHeaderBurgerMenuNavItem {...{ ...props, href }} />;
}
