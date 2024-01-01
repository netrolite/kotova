import TestListCard from "./Card";
import TestListInfiniteScroll from "@/components/routes/my/tests/TestsInfiniteScroll";
import getSubjectTests from "@/lib/fetchers/getSubjectTests";

type Props = {
  query: string;
  subjectId: string;
  grades: number[];
};

export default async function TestList({ query, subjectId, grades }: Props) {
  const tests = await getSubjectTests({ query, subjectId, page: 0, grades });
  if (!tests.length) {
    return (
      <p>
        Не нашлось результатов по запросу {query}. Рекомендуем проверить его на
        ошибки!
      </p>
    );
  }

  const serverFetchResultsLength = tests.length;
  return (
    <section className="space-y-4">
      {tests.map((test) => (
        <TestListCard key={test.id} {...test} />
      ))}
      <TestListInfiniteScroll
        {...{ query, grades, serverFetchResultsLength, subjectId }}
      />
    </section>
  );
}
