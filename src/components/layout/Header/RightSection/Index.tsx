import { Suspense } from "react";
import HeaderSignInBtn from "../SignInBtn";
import HeaderRightSectionContent from "./Content";

export default function HeaderRightSection() {
  return (
    <div className="ml-auto flex items-center">
      <Suspense fallback={<HeaderSignInBtn />}>
        <HeaderRightSectionContent />
      </Suspense>
    </div>
  );
}
