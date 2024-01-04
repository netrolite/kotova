import { ComboboxItem } from "@/components/Combobox";
import PageTitle from "@/components/PageTitle";
import AddTestForm from "@/components/routes/my/tests/add/Form/Index";
import getSubjects from "@/lib/fetchers/getSubjects";

export default async function AddTest() {
  const subjectsRaw = await getSubjects();
  const subjects: ComboboxItem<string>[] = subjectsRaw.map((subject) => ({
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
