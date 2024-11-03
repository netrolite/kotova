import DashboardCard from "../Card/Card";
import { db } from "@/lib/db";

export default async function DashboardManageFilesCard() {
  const filesCount = await db.testFile.count();

  return (
    <DashboardCard
      title="Файлы"
      link={{ href: "/my/manage-files", label: "Все файлы" }}
    >
      {filesCount}
    </DashboardCard>
  );
}
