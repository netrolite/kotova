"use client";

import { ReactNode } from "react";
import Logo from "../../Logo";
import SignInBtn from "./SignInBtn";
import HeaderAvatar from "./Avatar";
import { HeaderBackBtn } from "./BackBtn";
import useIsOnHomepage from "@/lib/hooks/useIsOnHomepage";
import { useSession } from "next-auth/react";

type Props = {
  pageTitle?: string;
};

export default function Header({ pageTitle }: Props) {
  const isOnHomepage = useIsOnHomepage();
  const session = useSession();
  const isUnauthed = session.status === "unauthenticated";

  return (
    <header className="flex justify-between px-4 py-3 border-b border-slate-300">
      <div>
        {isOnHomepage ? <Logo className="max-w-[100px]" /> : <HeaderBackBtn />}
      </div>
      {isUnauthed ? <SignInBtn /> : <HeaderAvatar />}
    </header>
  );
}
