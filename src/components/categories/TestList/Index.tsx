import CategoryTestListCard from "./Card";
import getCategoryTests from "@/lib/fetchers/getCategoryTests";
import CategoryTestListInfiniteScroll from "./InfiniteScroll/Index";

type Props = {
  query: string;
  categoryId: string;
  grades: number[];
};

export default async function CategoryTestList({
  query,
  categoryId,
  grades,
}: Props) {
  const tests = await getCategoryTests({
    query,
    categoryId: categoryId,
    page: 0,
    grades,
  });

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
        <CategoryTestListCard key={test.id} {...test} />
      ))}
      <CategoryTestListInfiniteScroll
        {...{ grades, query, categoryId: categoryId, tests }}
      />
    </section>
  );
}
