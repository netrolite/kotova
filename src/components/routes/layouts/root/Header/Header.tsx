"use client";

import SignInBtn from "./SignInBtn";
import HeaderAvatar from "./Avatar";
import { HeaderBackBtn } from "./BackBtn";
import useIsOnHomepage from "@/lib/hooks/useIsOnHomepage";
import { useSession } from "next-auth/react";
import HeaderWrapper from "./Wrapper";
import Logo from "@/components/Logo";

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

      <div className="ml-auto flex items-center">
        {isUnauthed ? <SignInBtn /> : <HeaderAvatar />}
      </div>
    </HeaderWrapper>
  );
}
