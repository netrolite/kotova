import { AddTestFormSchemaType } from "@/lib/zod/schemas/addTestForm/Index";
import { createContext } from "react";
import { UseFieldArrayReturn } from "react-hook-form";

type AddTestFormQuestionContextType = {
  index: number;
  optionsFields: UseFieldArrayReturn<
    AddTestFormSchemaType,
    `questions.${number}.options`,
    "id"
  >;
};
const AddTestFormQuestionContext =
  createContext<AddTestFormQuestionContextType | null>(null);
export default AddTestFormQuestionContext;
