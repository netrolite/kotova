import { MyTestEditFormQuestionOptionSchemaType } from "@/lib/zod/schemas/myTestEditForm/QuestionOption";
import { createContext } from "react";

type MyTestEditFormQuestionOptionContextType = {
  option: MyTestEditFormQuestionOptionSchemaType;
  optionIndex: number;
};
const MyTestEditFormQuestionOptionContext =
  createContext<MyTestEditFormQuestionOptionContextType | null>(null);
export default MyTestEditFormQuestionOptionContext;
