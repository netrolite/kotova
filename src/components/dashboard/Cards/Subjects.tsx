import DashboardCard from "../Card/Card";
import getSubjectsCount from "@/lib/fetchers/getSubjectsCount";

export default async function DashboardSubjectsCard() {
  const subjectsCount = await getSubjectsCount();

  return (
    <DashboardCard
      title="Предметы"
      link={{ href: "/my/subjects", label: "Предметы" }}
    >
      {subjectsCount}
    </DashboardCard>
  );
}
