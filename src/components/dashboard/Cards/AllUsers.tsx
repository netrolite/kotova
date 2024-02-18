import getUsersCount from "@/lib/fetchers/allUsers/getUsersCount";
import DashboardCard from "../Card/Card";

export default async function DashboardAllUsersCard() {
  const usersCount = await getUsersCount();

  return (
    <DashboardCard
      title="Все пользователи"
      link={{ href: "/my/users", label: "Все пользователи" }}
    >
      {usersCount}
    </DashboardCard>
  );
}
