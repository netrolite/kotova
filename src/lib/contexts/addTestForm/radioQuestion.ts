import { AddTestFormSchemaType } from "@/lib/zod/schemas/addTestForm/Index";
import { createContext } from "react";
import { UseFieldArrayReturn } from "react-hook-form";

type AddTestFormRadioQuestionContextType = {
  optionsFields: UseFieldArrayReturn<
    AddTestFormSchemaType,
    `questions.${number}.options`,
    "id"
  >;
};
const AddTestFormRadioQuestionContext =
  createContext<AddTestFormRadioQuestionContextType | null>(null);
export default AddTestFormRadioQuestionContext;
