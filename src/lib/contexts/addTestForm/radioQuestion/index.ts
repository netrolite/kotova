import { AddTestFormSchemaType } from "@/lib/zod/schemas/addTestForm/Index";
import { createContext } from "react";
import { UseFieldArrayReturn } from "react-hook-form";

type AddTestFormCheckboxQuestionContextType = {
  optionsFields: UseFieldArrayReturn<
    AddTestFormSchemaType,
    `questions.${number}.options`,
    "id"
  >;
};
const AddTestFormCheckboxQuestionContext =
  createContext<AddTestFormCheckboxQuestionContextType | null>(null);
export default AddTestFormCheckboxQuestionContext;
