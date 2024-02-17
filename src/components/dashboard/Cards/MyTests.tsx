import getSignedInUserOrRedirect from "@/lib/fetchers/getSignedInUserOrRedirect";
import DashboardCard from "../Card/Card";
import getTestsCount from "@/lib/fetchers/getTestsCount";
import { ROLE, Role } from "@/lib/types/enums/Role";

export default async function DashboardMyTestsCard() {
  const user = await getSignedInUserOrRedirect();
  const allowedRoles: Role[] = [ROLE.ADMIN, ROLE.TEACHER];
  if (!allowedRoles.includes(user.role as Role)) return null;

  const testsCount = await getTestsCount(user.id);

  return (
    <DashboardCard
      title="Мои тесты"
      link={{ href: "/my/tests", label: "Мои тесты" }}
    >
      {testsCount}
    </DashboardCard>
  );
}
