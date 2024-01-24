import { Suspense } from "react";
import HeaderSignInBtn from "../SignInBtn";
import HeaderRightSectionContent from "./Content";
import getUrlFromHeaders from "@/lib/getUrlFromHeaders";

export default function HeaderRightSection() {
  const url = getUrlFromHeaders() || "/";
  return (
    <div className="ml-auto flex items-center">
      <Suspense fallback={<HeaderSignInBtn {...{ url }} />}>
        <HeaderRightSectionContent />
      </Suspense>
    </div>
  );
}
