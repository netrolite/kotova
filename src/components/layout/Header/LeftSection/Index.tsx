import getUrlFromHeaders from "@/lib/getUrlFromHeaders";
import HeaderLeftSectionContentWrapper from "./ContentWrapper";

export default function HeaderLeftSection() {
  const url = new URL(getUrlFromHeaders() || "/");
  const shouldShowBackBtn = url.searchParams.get("hideBackBtn") === null;
  return (
    <HeaderLeftSectionContentWrapper
      {...{
        shouldShowBackBtn,
        initPageLoadUrl: url.toString(),
        initPageLoadTimestamp: Date.now(),
      }}
    />
  );
}
