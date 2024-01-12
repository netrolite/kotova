import useContextVal from "../contextVal";
import TakeTestQuestionContext from "@/lib/contexts/takeTest/question";

export default function useTakeTestQuestionContext() {
  return useContextVal(TakeTestQuestionContext);
}
