"use client";

import { HeaderBackBtn } from "../BackBtn/Index";
import Logo from "@/components/Logo";
import useIsOnHomepage from "@/lib/hooks/isOnHomepage";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  shouldShowBackBtn: boolean;
  initPageLoadUrl: string;
  initPageLoadTimestamp: number;
};

const TIMESTAMP_OFFSET = 1000;

export default function MainLayoutHeaderLeftSectionContent({
  shouldShowBackBtn,
  initPageLoadUrl,
  initPageLoadTimestamp,
}: Props) {
  const pathname = usePathname();
  const isOnHomepage = useIsOnHomepage();
  const [isInitLoad, setIsInitLoad] = useState(
    getIsInitLoad(initPageLoadTimestamp),
  );
  const [isOnSamePageAfterInitLoad, setIsOnSamePageAfterInitLoad] = useState(
    location.href === initPageLoadUrl,
  );
  const [urlHasHideBackBtnParam, setUrlHasHideBackBtnParam] = useState(
    getUrlHasHideBackBtnParam(),
  );
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) setIsFirstRender(false);
  }, [isFirstRender]);

  // this only runs on route change (navigation)
  useEffect(() => {
    if (isFirstRender) return;

    setIsOnSamePageAfterInitLoad(false);
    setUrlHasHideBackBtnParam(getUrlHasHideBackBtnParam());
    setIsInitLoad(getIsInitLoad(initPageLoadTimestamp));
  }, [pathname]);

  // show back btn if on the same page after inital hard navigation
  // and over 200ms has passed since that hard navigation
  // (if 200ms hasn't passed it means the current page is where we ended up after a hard navigation)
  if (!urlHasHideBackBtnParam && (!isOnSamePageAfterInitLoad || !isInitLoad)) {
    shouldShowBackBtn = true;
  }

  if (isOnHomepage) {
    return (
      <>
        <Logo className="max-w-[100px]" linkClassName="md:hidden" />
        <span className="hidden md:block">Главная</span>
      </>
    );
  } else if (shouldShowBackBtn) {
    return <HeaderBackBtn />;
  }
  return <Logo className="max-w-[100px]" linkClassName="md:hidden" />;
}

function getUrlHasHideBackBtnParam() {
  return new URL(location.href).searchParams.get("hideBackBtn") !== null;
}

function getIsInitLoad(initPageLoadTimestamp: number) {
  return initPageLoadTimestamp + TIMESTAMP_OFFSET >= Date.now();
}
