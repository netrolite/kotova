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
  params: { id: string };
  searchParams: { q?: string; grades?: string };
};

export default async function CategoryTests({
  params: { id: categoryId },
  searchParams: { q: queryRaw, grades: gradesRaw },
}: Props) {
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
