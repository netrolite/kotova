import useAddTestFormContext from "@/lib/hooks/addTestForm/context";
import { useFieldArray } from "react-hook-form";
import AddTestFormQuestionContext, {
  AddTestFormQuestionContextType,
} from "./question";
import { ReactNode } from "react";

type Props = {
  value: Omit<AddTestFormQuestionContextType, "optionsFields">;
  children: ReactNode;
};

export default function AddTestFormQuestionContextProvider({
  value,
  children,
}: Props) {
  const { control } = useAddTestFormContext();
  const optionsFields = useFieldArray({
    control,
    name: `questions.${value.index}.options`,
  });

  return (
    <AddTestFormQuestionContext.Provider
      value={{ index: value.index, optionsFields }}
    >
      {children}
    </AddTestFormQuestionContext.Provider>
  );
}
