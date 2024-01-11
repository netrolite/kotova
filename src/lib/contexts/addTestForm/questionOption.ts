import { AddTestFormQuestionOptionSchemaType } from "@/lib/zod/schemas/addTestForm/QuestionOption";
import { createContext } from "react";

type AddTestFormQuestionOptionContextType = {
  option: AddTestFormQuestionOptionSchemaType;
  optionIndex: number;
};
const AddTestFormQuestionOptionContext =
  createContext<AddTestFormQuestionOptionContextType | null>(null);
export default AddTestFormQuestionOptionContext;
