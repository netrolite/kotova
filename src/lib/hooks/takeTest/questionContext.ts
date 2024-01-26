import useContextVal from "../contextVal";
import TakeTestQuestionContext from "@/lib/contexts/takeTest/question/Index";

export default function useTakeTestQuestionContext() {
  return useContextVal(TakeTestQuestionContext);
}
