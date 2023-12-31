import PageTitle from "@/components/PageTitle";
import TestListTest from "@/components/routes/my/tests/Test";
import TestListTestsInfiniteScroll from "@/components/routes/my/tests/TestsInfiniteScroll";
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
            <TestListTest test={test} key={test.id} />
          ))}
          <TestListTestsInfiniteScroll
            serverFetchResultsLength={tests.length}
          />
        </ul>
      </section>
    </>
  );
}
