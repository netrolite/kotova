import getSignedInUserOrRedirect from "@/lib/fetchers/getSignedInUserOrRedirect";
import DashboardCard from "../Card/Card";
import { ROLE } from "@/lib/types/enums/Role";
import getSubjectsCount from "@/lib/fetchers/getSubjectsCount";

export default async function DashboardSubjectsCard() {
  const user = await getSignedInUserOrRedirect();
  if (user.role !== ROLE.ADMIN) return null;
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
