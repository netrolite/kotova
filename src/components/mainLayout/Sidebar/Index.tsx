import Logo from "@/components/Logo";
import MainLayoutHeaderWrapper from "../Header/Wrapper";
import SidebarLinks from "./NavItems";

export default async function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-full w-full max-w-[260px] space-y-2 px-4 md:block">
      <MainLayoutHeaderWrapper className="border-none" asDiv={true}>
        <Logo className="max-w-[100px]" />
      </MainLayoutHeaderWrapper>
      <SidebarLinks />
    </aside>
  );
}
