import { Suspense } from "react";
import MainLayoutHeaderSignInBtn from "../SignInBtn";
import MainLayoutHeaderRightSectionContent from "./Content";
import getUrlFromHeaders from "@/lib/getUrlFromHeaders";

export default async function MainLayoutHeaderRightSection() {
  const url = (await getUrlFromHeaders()) || "/";
  return (
    <div className="flex items-center justify-end">
      <Suspense fallback={<MainLayoutHeaderSignInBtn {...{ url }} />}>
        <MainLayoutHeaderRightSectionContent />
      </Suspense>
    </div>
  );
}
