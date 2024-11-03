import { z } from "zod";
import PageTitle from "@/components/PageTitle";
import getCategory from "@/lib/fetchers/getCategory";
import getCategoryTests from "@/lib/fetchers/getCategoryTests";
import parseUriComponent from "@/lib/parseUriComponent";
import { notFound } from "next/navigation";
import TestListSearch from "@/components/categories/Search";
import CategoryTestListFilter from "@/components/categories/Filter/Index";
import CategoryTestList from "@/components/categories/TestList/Index";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ q?: string; grades?: string }>;
};

export default async function CategoryTests(props: Props) {
  const searchParams = await props.searchParams;

  const {
    q: queryRaw,
    grades: gradesRaw
  } = searchParams;

  const params = await props.params;

  const {
    id: categoryId
  } = params;

  const grades = parseUriComponent(gradesRaw || "", z.number().array()) || [];
  const query = queryRaw || "";
  getCategoryTests({ query, categoryId: categoryId, page: 0, grades });
  const category = await getCategory(categoryId);
  if (!category) notFound();

  return (
    <>
      <section className="mb-8 space-y-4">
        <PageTitle>Тесты в категории {category.title}</PageTitle>
        <div className="space-y-2">
          <TestListSearch initQuery={query} />
          <CategoryTestListFilter />
        </div>
      </section>

      <CategoryTestList {...{ query, grades, categoryId: categoryId }} />
    </>
  );
}
