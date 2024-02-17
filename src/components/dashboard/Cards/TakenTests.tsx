import getSignedInUserOrRedirect from "@/lib/fetchers/getSignedInUserOrRedirect";
import DashboardCard from "../Card/Card";

export default async function DashboardTakenTestsCard() {
  const user = (await getSignedInUserOrRedirect({
    _count: { select: { testResults: true } },
  })) as unknown as { _count: { testResults: number } };

  return (
    <DashboardCard
      title="Пройденные тесты"
      link={{ label: "Все пройденные тесты", href: "/my/taken-tests" }}
    >
      {user._count.testResults}
    </DashboardCard>
  );
}
