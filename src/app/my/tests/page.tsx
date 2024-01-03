import BtnWithIcon from "@/components/Btns/WithIcon";
import PageTitle from "@/components/PageTitle";
import MyTestsTestListInfiniteScroll from "@/components/routes/my/tests/TestList/InfiniteScroll";
import MyTestsTestListTest from "@/components/routes/my/tests/TestList/Test";
import getSignedInUserOrRedirect from "@/lib/fetchers/getSignedInUserOrRedirect";
import getTestsForMyTestsList from "@/lib/fetchers/getTestsForMyTestsList";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function Tests() {
  const user = await getSignedInUserOrRedirect();
  const tests = await getTestsForMyTestsList({ user, page: 0 });

  return (
    <>
      <div className="mb-8">
        <PageTitle className="mb-2">Ваши тесты</PageTitle>
        <Link href="/my/tests/add">
          <BtnWithIcon icon={<PlusIcon />}>Добавить тест</BtnWithIcon>
        </Link>
      </div>
      <section>
        <ul className="space-y-4">
          {tests.map((test) => (
            <MyTestsTestListTest {...test} key={test.id} />
          ))}
          <MyTestsTestListInfiniteScroll {...{ tests }} />
        </ul>
      </section>
    </>
  );
}
