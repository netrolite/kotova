import PageTitle from "@/components/PageTitle";
import AddTestForm from "@/components/dashboard/tests/add/Form/Index";
import getSignedInUserOrRedirect from "@/lib/fetchers/getSignedInUserOrRedirect";
import getSubjects from "@/lib/fetchers/getSubjects";
import SelectItemType from "@/lib/types/SelectItem";

export default async function AddTest() {
  const [subjectsRaw] = await Promise.all([
    getSubjects(),
    getSignedInUserOrRedirect(),
  ]);
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
