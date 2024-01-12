import useGradesFilterStore from "@/lib/stores/gradesFilter";

export default function SubjectTestListFilterPillsList() {
  const selectedGrades = useGradesFilterStore((sel) => sel.selectedGrades);
  return (
    <ul className="flex min-h-[32px] flex-wrap gap-1">
      {selectedGrades.map((grade) => (
        <li
          className="rounded-full bg-primary px-2 py-1 text-primary-foreground"
          key={grade}
        >
          {grade} класс
        </li>
      ))}
    </ul>
  );
}
