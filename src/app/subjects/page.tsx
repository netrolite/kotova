import PageTitle from "@/components/PageTitle";
import SubjectsList from "@/components/routes/subjects/SubjectsList";
import { db } from "@/lib/db";

export const metadata = {
  title: "Список тестов по предметам",
  description:
    "На этой странице показан список предметов, по которым можно пройти тесты",
};

export default async function Subjects() {
  const subjects = await db.subject.findMany({
    include: { tests: { include: { _count: true } } },
  });

  return (
    <>
      <div className="mb-8 space-y-2">
        <PageTitle className="mb-0">Тесты по предметам</PageTitle>
      </div>
      <SubjectsList {...{ subjects }} />
    </>
  );
}
