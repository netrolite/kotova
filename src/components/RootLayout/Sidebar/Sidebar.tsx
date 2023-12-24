import Logo from "@/components/Logo";
import HeaderWrapper from "../Header/Header/Wrapper";

export default function Sidebar() {
  return (
    <aside className="hidden w-full max-w-[260px] md:block">
      <HeaderWrapper className="border-none" asDiv={true}>
        <Logo className="max-w-[100px]" />
      </HeaderWrapper>
      <div className="px-4 py-3">content</div>
    </aside>
  );
}
