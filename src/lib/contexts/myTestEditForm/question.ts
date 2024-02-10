import { MyTestEditFormSchemaType } from "@/lib/zod/schemas/myTestEditForm/Index";
import { createContext } from "react";
import { UseFieldArrayReturn } from "react-hook-form";

export type MyTestEditFormQuestionContextType = {
  index: number;
  optionsFields: UseFieldArrayReturn<
    MyTestEditFormSchemaType,
    `questions.${number}.options`,
    "id"
  >;
};
const MyTestEditFormQuestionContext =
  createContext<MyTestEditFormQuestionContextType | null>(null);
export default MyTestEditFormQuestionContext;
