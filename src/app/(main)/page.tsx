import PageTitle from "@/components/PageTitle";
import HomepageRecentlyCreatedTests from "@/components/homepage/RecentlyCreatedTests/Index";
import HomepageRecentlyCreatedTestsSkeleton from "@/components/homepage/RecentlyCreatedTests/Skeleton";
import { Suspense } from "react";

export const metadata = {
  title: {
    absolute: "Учитель Русского Языка и Литературы Котова Виктория",
  },
};

export default function Home() {
  return (
    <>
      <PageTitle className="mb-8">Недавно созданные тесты</PageTitle>
      <Suspense fallback={<HomepageRecentlyCreatedTestsSkeleton />}>
        <HomepageRecentlyCreatedTests />
      </Suspense>
    </>
  );
}
