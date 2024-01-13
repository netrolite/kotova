"use client";

import Logo from "@/components/Logo";
import useIsOnHomepage from "@/lib/hooks/isOnHomepage";
import { HeaderBackBtn } from "./BackBtn";

export default function HeaderLeftSection() {
  const isOnHomepage = useIsOnHomepage();

  if (isOnHomepage) {
    return (
      <>
        <Logo className="max-w-[100px]" linkClassName="md:hidden" />
        <span className="hidden md:block">Главная</span>
      </>
    );
  }

  return <HeaderBackBtn />;
}
