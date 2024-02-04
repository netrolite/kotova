"use client";

import { ReactNode } from "react";
import { SWRConfig, SWRConfiguration } from "swr";

type Props = {
  children: ReactNode;
  config: SWRConfiguration;
};

export default function SwrProvider({ children, config }: Props) {
  return (
    <SWRConfig value={{ revalidateOnMount: false, ...config }}>
      {children}
    </SWRConfig>
  );
}
