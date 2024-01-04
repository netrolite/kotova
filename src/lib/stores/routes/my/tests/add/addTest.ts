import { create } from "zustand";
import { TEST_QUESTION_TYPE } from "@/lib/types/enums/TestQuestionType";
import GetEnum from "@/lib/types/GetEnum";
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

type AddTestStore = {
  questions: (TextQuestion | OptionsQuestion)[];
  addTextQuestion: () => void;
  addOptionsQuestion: (questionType: OptionsQuestion["type"]) => void;

  isQuestionTypeDialogOpen: boolean;
  setIsQuestionTypeDialogOpen: (val: boolean) => void;
};

const useAddTestStore = create<AddTestStore>()((set, get) => ({
  questions: [],
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

  isQuestionTypeDialogOpen: false,
  setIsQuestionTypeDialogOpen: (val) => set({ isQuestionTypeDialogOpen: val }),
}));

export default useAddTestStore;
