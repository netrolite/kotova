import DashboardCard from "../Card/Card";
import { db } from "@/lib/db";

export default async function DashboardFilesCard() {
  const filesCount = await db.testFile.count();

  return (
    <DashboardCard
      title="Файлы"
      link={{ href: "/my/files", label: "Все файлы" }}
    >
      {filesCount}
    </DashboardCard>
  );
}
