import { TestResultAnswerContext } from "@/lib/contexts/testResult/Answer";
import useContextVal from "../contextVal";

export default function useTestResultAnswerContext() {
  return useContextVal(TestResultAnswerContext);
}
