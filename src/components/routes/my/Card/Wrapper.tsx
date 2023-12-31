import { ReactNode, Suspense } from "react";
import DashboardCardSkeleton from "./Skeleton";

type Props = {
  card: ReactNode;
};

export default function DashboardCardWrapper({ card }: Props) {
  return <Suspense fallback={<DashboardCardSkeleton />}>{card}</Suspense>;
}
