import BtnWithIcon from "@/components/Btns/WithIcon";
import PageTitle from "@/components/PageTitle";
import DashboardTestsTestListInfiniteScroll from "@/components/dashboard/tests/TestList/InfiniteScroll";
import DashboardTestsTestListTest from "@/components/dashboard/tests/TestList/Test";
import getSignedInUserOrRedirect from "@/lib/fetchers/getSignedInUserOrRedirect";
import getTestsForDashboardTestsList from "@/lib/fetchers/getTestsForDashboardTestsList";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function Tests() {
  const user = await getSignedInUserOrRedirect();
  const tests = await getTestsForDashboardTestsList({ user, page: 0 });

  return (
    <>
      <div className="mb-8 flex flex-col gap-2">
        <PageTitle>Ваши тесты</PageTitle>
        {!tests.length && (
          <p className="text-muted-foreground">
            У вас ещё нет созданных тестов
          </p>
        )}
        <Link className="max-w-min hover:no-underline" href="/my/tests/create">
          <BtnWithIcon icon={<PlusIcon />}>Создать тест</BtnWithIcon>
        </Link>
      </div>
      <section>
        <ul className="space-y-4">
          {tests.map((test) => (
            <DashboardTestsTestListTest {...test} key={test.id} />
          ))}
          <DashboardTestsTestListInfiniteScroll {...{ tests }} />
        </ul>
      </section>
    </>
  );
}
