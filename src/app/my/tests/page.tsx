import PageTitle from "@/components/PageTitle";
import MyTestsTestListInfiniteScroll from "@/components/routes/my/tests/TestList/InfiniteScroll";
import MyTestsTestListTest from "@/components/routes/my/tests/TestList/Test";
import getSignedInUserOrRedirect from "@/lib/fetchers/getSignedInUserOrRedirect";
import getTestsForMyTestsList from "@/lib/fetchers/getTestsForMyTestsList";

export default async function Tests() {
  const user = await getSignedInUserOrRedirect();
  const tests = await getTestsForMyTestsList({ user, page: 0 });

  return (
    <>
      <PageTitle className="mb-8">Ваши тесты</PageTitle>
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
