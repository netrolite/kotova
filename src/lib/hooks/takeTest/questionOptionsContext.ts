import TakeTestQuestionOptionsContext from "@/lib/contexts/takeTest/question/options";
import useContextVal from "../contextVal";

export default function useTakeTestQuestionOptionsContext() {
  return useContextVal(TakeTestQuestionOptionsContext);
}
