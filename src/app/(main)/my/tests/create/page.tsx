import AccessDenied from "@/components/AccessDenied";
import PageTitle from "@/components/PageTitle";
import AddTestForm from "@/components/dashboard/tests/add/Form/Index";
import getSignedInUserOrRedirect from "@/lib/fetchers/getSignedInUserOrRedirect";
import getSubjects from "@/lib/fetchers/getSubjects";
import SelectItemType from "@/lib/types/SelectItem";
import { ROLE } from "@/lib/types/enums/Role";

export default async function AddTest() {
  const [subjectsRaw, user] = await Promise.all([
    getSubjects(),
    getSignedInUserOrRedirect(),
  ]);
  if (user.role !== ROLE.TEACHER && user.role !== ROLE.ADMIN) {
    return <AccessDenied />;
  }
  const subjects: SelectItemType<string>[] = subjectsRaw.map((subject) => ({
    label: subject.title,
    value: subject.id,
  }));

  return (
    <>
      <PageTitle className="mb-10">Создать тест</PageTitle>
      <AddTestForm {...{ subjects }} />
    </>
  );
}
