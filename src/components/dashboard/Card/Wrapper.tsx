import { ReactNode, Suspense } from "react";
import DashboardCardSkeleton from "./Skeleton";

type Props = {
  children: ReactNode;
};

export default function DashboardCardWrapper({ children }: Props) {
  return <Suspense fallback={<DashboardCardSkeleton />}>{children}</Suspense>;
}
