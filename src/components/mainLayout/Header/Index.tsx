import MainLayoutHeaderWrapper from "./Wrapper";
import MainLayoutHeaderLeftSection from "./LeftSection/Index";
import MainLayoutHeaderRightSection from "./RightSection/Index";

export default function MainLayoutHeader() {
  return (
    <MainLayoutHeaderWrapper className="fixed left-0 right-0 top-0 z-20 bg-white/80 backdrop-blur-md md:sticky">
      <MainLayoutHeaderLeftSection />
      <MainLayoutHeaderRightSection />
    </MainLayoutHeaderWrapper>
  );
}
