import getSignedInUserOrRedirect from "@/lib/fetchers/getSignedInUserOrRedirect";
import DashboardCard from "../Card/Card";
import getTestsCount from "@/lib/fetchers/getTestsCount";

export default async function DashboardMyTestsCard() {
  const user = await getSignedInUserOrRedirect();
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
