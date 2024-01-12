import TestResultAnswerContext from "@/lib/contexts/testResult";
import useContextVal from "../contextVal";

export default function useTestResultAnswerContext() {
  return useContextVal(TestResultAnswerContext);
}
