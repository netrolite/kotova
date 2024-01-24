import getUrlFromHeaders from "@/lib/getUrlFromHeaders";
import MainLayoutHeaderLeftSectionContentWrapper from "./ContentWrapper";

export default function MainLayoutHeaderLeftSection() {
  const url = new URL(getUrlFromHeaders() || "/");
  const shouldShowBackBtn = url.searchParams.get("hideBackBtn") === null;
  return (
    <MainLayoutHeaderLeftSectionContentWrapper
      {...{
        shouldShowBackBtn,
        initPageLoadUrl: url.toString(),
        initPageLoadTimestamp: Date.now(),
      }}
    />
  );
}
