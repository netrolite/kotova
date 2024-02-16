import getSignedInUserOrRedirect from "@/lib/fetchers/getSignedInUserOrRedirect";
import DashboardCard from "../Card/Card";
import roundTestScore from "@/lib/roundTestScore";

export default async function DashboardAvgScoreCard() {
  const user = await getSignedInUserOrRedirect();

  return (
    <DashboardCard title="Средний балл">
      {roundTestScore(user.avgTestScore) ?? "Нет данных"}
    </DashboardCard>
  );
}
