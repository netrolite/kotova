import { makeArr } from "@/lib/makeArr";
import { create } from "zustand";
import { TEST_QUESTION_TYPE } from "@/lib/types/enums/TestQuestionType";
import GetEnum from "@/lib/types/GetEnum";
import { ComboboxItem } from "@/components/Combobox";
import deepCopy from "@/lib/deepCopy";

type QuestionBase = {
  explanation?: string;
};

type TextQuestion = QuestionBase & {
  type: typeof TEST_QUESTION_TYPE.TEXT;
  correctAnswer: string;
};

type OptionsQuestion = QuestionBase & {
  type: GetEnum<Omit<typeof TEST_QUESTION_TYPE, "TEXT">>;
  options: QuestionOption[];
};

type QuestionOption = {
  content: string;
  isCorrect: boolean;
};

type Grade = number;

type AddTestStore = {
  selectedSubject: string | null;
  setSelectedSubject: (subject: string | null) => void;
  isSubjectsComboboxOpen: boolean;
  setIsSubjectsComboboxOpen: (val: boolean) => void;

  grades: ComboboxItem<Grade>[];
  selectedGrades: Grade[];

  questions: (TextQuestion | OptionsQuestion)[];
  addTextQuestion: () => void;
  addOptionsQuestion: (questionType: OptionsQuestion["type"]) => void;
};

const useAddTestStore = create<AddTestStore>()((set, get) => ({
  selectedSubject: null,
  setSelectedSubject: (subject) => set({ selectedSubject: subject }),
  questions: [],
  grades: makeArr({ from: 1, to: 11 }).map((grade) => ({
    value: grade,
    label: `${grade} класс`,
  })),
  selectedGrades: [],
  addTextQuestion: () =>
    set({
      questions: [
        ...deepCopy(get().questions),
        { type: TEST_QUESTION_TYPE.TEXT, correctAnswer: "" },
      ],
    }),
  addOptionsQuestion: (questionType) =>
    set({
      questions: [
        ...deepCopy(get().questions),
        { type: questionType, options: [] },
      ],
    }),
  isSubjectsComboboxOpen: false,
  setIsSubjectsComboboxOpen: (val) => set({ isSubjectsComboboxOpen: val }),
}));

export default useAddTestStore;
