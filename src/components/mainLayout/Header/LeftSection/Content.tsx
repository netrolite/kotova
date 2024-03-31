"use client";

import { HeaderBackBtn } from "../BackBtn/Index";
import useIsOnHomepage from "@/lib/hooks/isOnHomepage";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MainLayoutHeaderLeftSectionBurgerMenu from "./BurgerMenu/Index";

export type MainLayoutHeaderLeftSectionContentProps = {
  shouldShowBackBtn: boolean;
  initPageLoadUrl: string;
  initPageLoadTimestamp: number;
};

const TIMESTAMP_OFFSET = 1000;

export default function MainLayoutHeaderLeftSectionContent({
  shouldShowBackBtn,
  initPageLoadUrl,
  initPageLoadTimestamp,
}: MainLayoutHeaderLeftSectionContentProps) {
  const pathname = usePathname();
  const isOnHomepage = useIsOnHomepage();
  const [isInitLoad, setIsInitLoad] = useState(
    getIsInitLoad(initPageLoadTimestamp),
  );
  const [pageLocation, setPageLocation] = useState<null | Location>(null);
  useEffect(() => {
    setPageLocation(location);
  }, []);

  const [isOnSamePageAfterInitLoad, setIsOnSamePageAfterInitLoad] = useState(
    pageLocation ? pageLocation.href === initPageLoadUrl : true,
  );
  const [urlHasHideBackBtnParam, setUrlHasHideBackBtnParam] = useState(
    getUrlHasHideBackBtnParam(pageLocation),
  );
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) setIsFirstRender(false);
  }, [isFirstRender]);

  // this only runs on route change (navigation)
  useEffect(() => {
    if (isFirstRender) return;

    setIsOnSamePageAfterInitLoad(false);
    setUrlHasHideBackBtnParam(getUrlHasHideBackBtnParam(pageLocation));
    setIsInitLoad(getIsInitLoad(initPageLoadTimestamp));
  }, [pathname]);

  // show back btn if on the same page after initial hard navigation
  // and over 200ms has passed since that hard navigation
  // (if 200ms hasn't passed it means the current page is where we ended up after a hard navigation)
  if (
    !isOnHomepage &&
    !urlHasHideBackBtnParam &&
    (!isOnSamePageAfterInitLoad || !isInitLoad)
  ) {
    shouldShowBackBtn = true;
  } else {
    shouldShowBackBtn = false;
  }

  return (
    <div className="flex items-center justify-start gap-3">
      {shouldShowBackBtn && <HeaderBackBtn />}
      <MainLayoutHeaderLeftSectionBurgerMenu />
    </div>
  );
}

function getUrlHasHideBackBtnParam(pageLocation: Location | null) {
  if (pageLocation === null) return null;
  return new URL(pageLocation.href).searchParams.get("hideBackBtn") !== null;
}

function getIsInitLoad(initPageLoadTimestamp: number) {
  return initPageLoadTimestamp + TIMESTAMP_OFFSET >= Date.now();
}
