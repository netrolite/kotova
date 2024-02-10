import useMyTestEditFormContext from "@/lib/hooks/myTestEditForm/context";
import { useFieldArray } from "react-hook-form";
import MyTestEditFormQuestionContext, {
  MyTestEditFormQuestionContextType,
} from "./question";
import { ReactNode } from "react";

type Props = {
  value: Omit<MyTestEditFormQuestionContextType, "optionsFields">;
  children: ReactNode;
};

export default function MyTestEditFormQuestionContextProvider({
  value,
  children,
}: Props) {
  const { control } = useMyTestEditFormContext();
  const optionsFields = useFieldArray({
    control,
    name: `questions.${value.index}.options`,
  });

  return (
    <MyTestEditFormQuestionContext.Provider
      value={{ index: value.index, optionsFields }}
    >
      {children}
    </MyTestEditFormQuestionContext.Provider>
  );
}
