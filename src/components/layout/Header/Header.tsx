import HeaderWrapper from "./Wrapper";
import HeaderLeftSection from "./LeftSection";
import HeaderRightSection from "./RightSection/Index";

export default function Header() {
  return (
    <HeaderWrapper className="fixed left-0 right-0 top-0 z-20 bg-white/80 backdrop-blur-md md:sticky">
      <HeaderLeftSection />
      <HeaderRightSection />
    </HeaderWrapper>
  );
}
