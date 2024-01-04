"use client";

import { Combobox, ComboboxItem } from "@/components/Combobox";
import useAddTestStore from "@/lib/stores/routes/my/tests/add/addTest";
import { Subject } from "@prisma/client";

type Props = {
  subjects: ComboboxItem<Subject["id"]>[];
};

export default function AddTestSubjectsComboboxContent({ subjects }: Props) {
  const comboboxProps = useAddTestStore((s) => ({
    isOpen: s.isSubjectsComboboxOpen,
    setIsOpen: s.setIsSubjectsComboboxOpen,
    value: s.selectedSubject,
    setValue: s.setSelectedSubject,
  }));

  return (
    <Combobox
      notFoundMsg="Предметы не найдены"
      selectMsg="Выберите предмет"
      items={subjects}
      {...comboboxProps}
    />
  );
}
