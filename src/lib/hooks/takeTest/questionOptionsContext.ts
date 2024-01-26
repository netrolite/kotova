import TakeTestQuestionOptionsContext from "@/lib/contexts/takeTest/question/Options";
import useContextVal from "../contextVal";

export default function useTakeTestQuestionOptionsContext() {
  return useContextVal(TakeTestQuestionOptionsContext);
}
