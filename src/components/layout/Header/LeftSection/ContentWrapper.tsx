"use client";

import { useEffect, useState } from "react";
import HeaderLeftSectionContent from "./Content";

type Props = {
  shouldShowBackBtn: boolean;
  initPageLoadUrl: string;
  initPageLoadTimestamp: number;
};

export default function HeaderLeftSectionContentWrapper(props: Props) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;
  return <HeaderLeftSectionContent {...props} />;
}
