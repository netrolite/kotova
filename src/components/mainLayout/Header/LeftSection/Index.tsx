import getUrlFromHeaders from "@/lib/getUrlFromHeaders";
import MainLayoutHeaderLeftSectionContent from "./Content";

export default async function MainLayoutHeaderLeftSection() {
  const url = new URL((await getUrlFromHeaders()) || "/");
  const shouldShowBackBtn = url.searchParams.get("hideBackBtn") === null;

  return (
    <MainLayoutHeaderLeftSectionContent
      {...{
        shouldShowBackBtn,
        initPageLoadUrl: url.toString(),
        initPageLoadTimestamp: Date.now(),
      }}
    />
  );
}
