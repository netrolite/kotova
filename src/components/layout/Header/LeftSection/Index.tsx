import getUrlFromHeaders from "@/lib/getUrlFromHeaders";
import HeaderLeftSectionContentWrapper from "./ContentWrapper";

export default function HeaderLeftSection() {
  const url = new URL(getUrlFromHeaders() || "/");
  const shouldHideBackBtn = url.searchParams.get("hideBackBtn") !== null;
  return (
    <HeaderLeftSectionContentWrapper
      {...{
        shouldHideBackBtn,
        initPageLoadUrl: url.toString(),
        initPageLoadTimestamp: Date.now(),
      }}
    />
  );
}
