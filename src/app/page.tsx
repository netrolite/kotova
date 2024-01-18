import PageTitle from "@/components/PageTitle";
import HomepageRecentlyCreatedTests from "@/components/homepage/RecentlyCreatedTests/Index";
import HomepageRecentlyCreatedTestsSkeleton from "@/components/homepage/RecentlyCreatedTests/Skeleton";
import { db } from "@/lib/db";
import { Suspense } from "react";

export const metadata = {
  title: {
    absolute: "Учитель Русского Языка и Литературы Котова Виктория",
  },
};

export default async function Home() {
  console.log(await db.user.findMany());
  return (
    <>
      <PageTitle className="mb-8">Недавно созданные тесты</PageTitle>
      <Suspense fallback={<HomepageRecentlyCreatedTestsSkeleton />}>
        <HomepageRecentlyCreatedTests />
      </Suspense>
    </>
  );
}
