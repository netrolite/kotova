import PageTitle from "@/components/PageTitle";
import HomepageRecentlyCreatedTests from "@/components/homepage/RecentlyCreatedTests/Index";
import HomepageRecentlyCreatedTestsSkeleton from "@/components/homepage/RecentlyCreatedTests/Skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = {
  title: {
    absolute: "Учитель Русского Языка и Литературы Котова Виктория",
  },
};

export default function Home() {
  return (
    <>
      <PageTitle className="mb-1">Недавно созданные тесты</PageTitle>
      <div className="mb-8">
        <Link className="underline text-primary" target="_blank" href="https://t.me/+US6-_mwdXTRhNzRi" >
          Наш Telegram чат
        </Link>
      </div>
      <Suspense fallback={<HomepageRecentlyCreatedTestsSkeleton />}>
        <HomepageRecentlyCreatedTests />
      </Suspense>
    </>
  );
}
