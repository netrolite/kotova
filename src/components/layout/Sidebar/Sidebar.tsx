import Logo from "@/components/Logo";
import HeaderWrapper from "../Header/Wrapper";
import SidebarLinks from "./NavItems";

export default async function Sidebar() {
  return (
    <aside className="hidden w-full max-w-[260px] space-y-2 px-4 md:block">
      <HeaderWrapper className="border-none" asDiv={true}>
        <Logo className="max-w-[100px]" />
      </HeaderWrapper>
      <SidebarLinks />
    </aside>
  );
}
