import { Suspense } from "react";
import MainLayoutHeaderSignInBtn from "../SignInBtn";
import MainLayoutHeaderRightSectionContent from "./Content";
import getUrlFromHeaders from "@/lib/getUrlFromHeaders";

export default function MainLayoutHeaderRightSection() {
  const url = getUrlFromHeaders() || "/";
  return (
    <div className="flex items-center">
      <Suspense fallback={<MainLayoutHeaderSignInBtn {...{ url }} />}>
        <MainLayoutHeaderRightSectionContent />
      </Suspense>
    </div>
  );
}
