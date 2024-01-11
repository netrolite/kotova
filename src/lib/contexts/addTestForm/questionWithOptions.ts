import { AddTestFormSchemaType } from "@/lib/zod/schemas/addTestForm/Index";
import { createContext } from "react";
import { UseFieldArrayReturn } from "react-hook-form";

type AddTestFormQuestionWithOptionsContextType = {
  optionsFields: UseFieldArrayReturn<
    AddTestFormSchemaType,
    `questions.${number}.options`,
    "id"
  >;
};
const AddTestFormQuestionWithOptionsContext =
  createContext<AddTestFormQuestionWithOptionsContextType | null>(null);
export default AddTestFormQuestionWithOptionsContext;
