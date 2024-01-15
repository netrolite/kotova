import SubjectTestListCard from "./Card";
import getSubjectTests from "@/lib/fetchers/getSubjectTests";
import SubjectTestListInfiniteScroll from "./InfiniteScroll/Index";

type Props = {
  query: string;
  subjectId: string;
  grades: number[];
};

export default async function SubjectTestList({
  query,
  subjectId,
  grades,
}: Props) {
  const tests = await getSubjectTests({ query, subjectId, page: 0, grades });

  if (!tests.length) {
    return (
      <p>
        По вашему запросу не нашлось результатов.
        {!!grades.length && " Попробуйте отключить некоторые фильтры"}
      </p>
    );
  }

  return (
    <section className="space-y-4">
      {tests.map((test) => (
        <SubjectTestListCard key={test.id} {...test} />
      ))}
      <SubjectTestListInfiniteScroll {...{ grades, query, subjectId, tests }} />
    </section>
  );
}
