import Logo from "@/components/Logo";
import HeaderWrapper from "../Header/Wrapper";
import SidebarLinks from "./Links";
import { auth } from "@/auth";

export default async function Sidebar() {
  const session = await auth();
  const role = session ? (session?.user as any).role || null : null;
  return (
    <aside className="hidden w-full max-w-[260px] space-y-2 px-4 md:block">
      <HeaderWrapper className="border-none" asDiv={true}>
        <Logo className="max-w-[100px]" />
      </HeaderWrapper>
      <SidebarLinks userRole={role} />
    </aside>
  );
}
