import FilterOption from "@/components/Filter/Option";
import useGradesFilterStore from "@/lib/stores/gradesFilter";
import { useEffect, useState } from "react";

type Props = {
  grade: number;
};

export default function SubjectTestListFilterOption({ grade }: Props) {
  const { selectedGrades, setSelectedGrades } = useGradesFilterStore();
  const [isChecked, setIsChecked] = useState(selectedGrades.includes(grade));

  function handleSelect() {
    setIsChecked((prev) => !prev);
  }

  useEffect(() => {
    if (isChecked) {
      const newSelectedGrades = [...new Set([...selectedGrades, grade])];
      setSelectedGrades(newSelectedGrades);
    } else {
      setSelectedGrades(selectedGrades.filter((g) => g !== grade));
    }
  }, [isChecked]);

  return (
    <FilterOption
      {...{ isChecked, onClick: handleSelect, title: `${grade} класс` }}
    />
  );
}
