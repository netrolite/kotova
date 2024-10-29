import PageTitle from "@/components/PageTitle";
import AddCategoryBtn from "@/components/dashboard/categories/Add/Btn";
import CategoriesList from "@/components/dashboard/categories/CategoriesList";

export default async function Categories() {
  return (
    <>
      <div className="mb-8">
        <PageTitle className="mb-2">Предметы</PageTitle>
        <AddCategoryBtn />
      </div>
      <CategoriesList />
    </>
  );
}
