import getSubjects from "@/lib/fetchers/getSubjects";
import AddTestSubjectsComboboxContent from "./Content";

type Props = {};

type SubjectItem = {
  label: string;
  value: string;
};

export default async function AddTestSubjectsCombobox({}: Props) {
  const subjects = await getSubjects();
  const subjectsItems: SubjectItem[] = subjects.map((subject) => ({
    label: subject.title,
    value: subject.id,
  }));

  return (
    <div className="space-y-1">
      <h3 className="text-lg font-semibold">Предмет</h3>
      <AddTestSubjectsComboboxContent subjects={subjectsItems} />
    </div>
  );
}
