import { TakeTestSchemaType } from "@/lib/zod/schemas/takeTest";
import { createContext } from "react";
import { UseFieldArrayReturn } from "react-hook-form";

export type TakeTestQuestionOptionsContextType = {
  optionsFields: UseFieldArrayReturn<
    TakeTestSchemaType,
    `answers.${number}.options`
  >;
};

const TakeTestQuestionOptionsContext =
  createContext<TakeTestQuestionOptionsContextType | null>(null);
export default TakeTestQuestionOptionsContext;
