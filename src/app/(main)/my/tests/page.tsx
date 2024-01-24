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
          <p className="text-muted-foreground">Вы ещё не создавали тесты</p>
        )}
        <Link className="max-w-min" href="/my/tests/create">
          <BtnWithIcon icon={<PlusIcon />}>Добавить тест</BtnWithIcon>
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
