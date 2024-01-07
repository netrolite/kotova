"use client";

import SignInBtn from "./SignInBtn";
import HeaderAvatar from "./Avatar";
import { HeaderBackBtn } from "./BackBtn";
import useIsOnHomepage from "@/lib/hooks/isOnHomepage";
import { useSession } from "next-auth/react";
import HeaderWrapper from "./Wrapper";
import Logo from "@/components/Logo";

export default function Header() {
  const isOnHomepage = useIsOnHomepage();
  const session = useSession();
  const isUnauthed = session.status === "unauthenticated";

  return (
    <HeaderWrapper className="sticky left-0 right-0 top-0 z-20 bg-white/80 backdrop-blur-md md:flex">
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
