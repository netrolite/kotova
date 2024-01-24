"use client";

import { useEffect, useState } from "react";
import MainLayoutHeaderLeftSectionContent from "./Content";

type Props = {
  shouldShowBackBtn: boolean;
  initPageLoadUrl: string;
  initPageLoadTimestamp: number;
};

export default function MainLayoutHeaderLeftSectionContentWrapper(
  props: Props,
) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;
  return <MainLayoutHeaderLeftSectionContent {...props} />;
}
