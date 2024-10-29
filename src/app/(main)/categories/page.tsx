import PageTitle from "@/components/PageTitle";
import CategoriesList from "@/components/categories/CategoriesList";
import { db } from "@/lib/db";

export const metadata = {
  title: "Список тестов по предметам",
  description:
    "На этой странице показан список предметов, по которым можно пройти тесты",
};

export default async function Categories() {
  const categories = await db.category.findMany({
    include: { tests: { include: { _count: true } } },
  });

  return (
    <>
      <div className="mb-8 space-y-2">
        <PageTitle className="mb-0">Тесты по предметам</PageTitle>
      </div>
      <CategoriesList {...{ categories: categories }} />
    </>
  );
}
