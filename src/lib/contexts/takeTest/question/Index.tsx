import { TakeTestGetTestReturn } from "@/lib/fetchers/takeTest/getTest";
import { createContext } from "react";

export type TakeTestQuestionContextType = Exclude<
  Awaited<TakeTestGetTestReturn>,
  null
>["questions"][number] & {
  questionIndex: number;
};

const TakeTestQuestionContext =
  createContext<TakeTestQuestionContextType | null>(null);
export default TakeTestQuestionContext;
