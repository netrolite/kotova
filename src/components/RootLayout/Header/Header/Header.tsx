"use client";

import Logo from "../../../Logo";
import SignInBtn from "../SignInBtn";
import HeaderAvatar from "../Avatar";
import { HeaderBackBtn } from "../BackBtn";
import useIsOnHomepage from "@/lib/hooks/useIsOnHomepage";
import { useSession } from "next-auth/react";
import HeaderWrapper from "./Wrapper";

export default function Header() {
  const isOnHomepage = useIsOnHomepage();
  const session = useSession();
  const isUnauthed = session.status === "unauthenticated";

  return (
    <HeaderWrapper>
      {isOnHomepage ? (
        <>
          <Logo className="max-w-[100px]" linkClassName="md:hidden" />
          <span className="hidden md:block">Главная</span>
        </>
      ) : (
        <HeaderBackBtn />
      )}

      <div className="ml-auto">
        {isUnauthed ? <SignInBtn /> : <HeaderAvatar />}
      </div>
    </HeaderWrapper>
  );
}
