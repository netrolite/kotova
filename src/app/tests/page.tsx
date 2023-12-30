import PageTitle from "@/components/PageTitle";
import AddSubjectBtn from "@/components/routes/tests/AddSubject/Btn";
import SubjectsList from "@/components/routes/tests/SubjectsList/SubjectsList";
import { db } from "@/lib/db";
import getSignedInUser from "@/lib/fetchers/getSignedInUser";
import { ROLE } from "@/lib/types/enums/Role";

export const metadata = {
  title: "Список тестов по предметам",
  description:
    "На этой странице показан список предметов, по которым можно пройти тесты",
};

export default async function Tests() {
  const signedInUserPromise = getSignedInUser({ role: true });
  const subjectsPromise = db.subject.findMany({
    include: { tests: { include: { _count: true } } },
  });
  const [signedInUser, subjects] = await Promise.all([
    signedInUserPromise,
    subjectsPromise,
  ]);
  const isAdmin = signedInUser?.role === ROLE.ADMIN;

  return (
    <>
      <div className="mb-8 space-y-2">
        <PageTitle className="mb-0">Тесты по предметам</PageTitle>
        {isAdmin && <AddSubjectBtn />}
      </div>
      <SubjectsList {...{ subjects, isAdmin }} />
    </>
  );
}
