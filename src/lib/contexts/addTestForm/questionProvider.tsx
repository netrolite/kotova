import useAddTestFormContext from "@/lib/hooks/addTestForm/context";
import { useFieldArray } from "react-hook-form";
import AddTestFormQuestionContext from "./question";
import { ReactNode } from "react";

type Props = {
  questionIndex: number;
  children: ReactNode;
};

export default function AddTestFormQuestionContextProvider({
  questionIndex,
  children,
}: Props) {
  const { control } = useAddTestFormContext();
  const optionsFields = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
  });
  return (
    <AddTestFormQuestionContext.Provider
      value={{ index: questionIndex, optionsFields }}
    >
      {children}
    </AddTestFormQuestionContext.Provider>
  );
}
