import PageTitle from "@/components/PageTitle";
import HomepageRecentlyCreatedTests from "@/components/homepage/RecentlyCreatedTests/Index";
import HomepageRecentlyCreatedTestsSkeleton from "@/components/homepage/RecentlyCreatedTests/Skeleton";
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
      <div className="mb-8 flex flex-col gap-1">
        <Link
          className="text-primary underline"
          target="_blank"
          href="https://t.me/+US6-_mwdXTRhNzRi"
        >
          Наш Telegram чат по русскому языку
        </Link>
        <Link
          className="text-primary underline"
          target="_blank"
          href="https://t.me/+TPa1gc2OAFRjMDVi"
        >
          Наш Telegram чат по литературе
        </Link>
      </div>
      <Suspense fallback={<HomepageRecentlyCreatedTestsSkeleton />}>
        <HomepageRecentlyCreatedTests />
      </Suspense>
    </>
  );
}
