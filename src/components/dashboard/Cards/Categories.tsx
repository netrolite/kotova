import DashboardCard from "../Card/Card";
import getCategoriesCount from "@/lib/fetchers/getCategoriesCount";

export default async function DashboardCategoriesCard() {
  const categoriesCount = await getCategoriesCount();

  return (
    <DashboardCard
      title="Предметы"
      link={{ href: "/my/categories", label: "Предметы" }}
    >
      {categoriesCount}
    </DashboardCard>
  );
}
