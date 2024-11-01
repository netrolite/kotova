import PageTitle from "@/components/PageTitle";
import CategoriesList from "@/components/categories/CategoriesList";
import { db } from "@/lib/db";

export const metadata = {
  title: "Список категорий тестов",
};

export default async function Categories() {
  const categories = await db.category.findMany({
    include: { tests: { include: { _count: true } } },
  });

  return (
    <>
      <div className="mb-8 space-y-2">
        <PageTitle className="mb-0">Категории тестов</PageTitle>
      </div>
      <CategoriesList {...{ categories: categories }} />
    </>
  );
}
