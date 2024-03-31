import getUrlFromHeaders from "@/lib/getUrlFromHeaders";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import MainLayoutHeaderLeftSectionContent from "./Content";

export default async function MainLayoutHeaderLeftSection() {
  const url = new URL(getUrlFromHeaders() || "/");
  const shouldShowBackBtn = url.searchParams.get("hideBackBtn") === null;
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <MainLayoutHeaderLeftSectionContent
        {...{
          shouldShowBackBtn,
          initPageLoadUrl: url.toString(),
          initPageLoadTimestamp: Date.now(),
        }}
      />
    </SessionProvider>
  );
}
