import { TestResultGetTestResultReturn } from "@/lib/fetchers/testResults/getTestResults";
import { createContext } from "react";

export type TestResultAnswerContextType = Exclude<
  TestResultGetTestResultReturn,
  null
>["answers"][number];

const TestResultAnswerContext =
  createContext<TestResultAnswerContextType | null>(null);
export default TestResultAnswerContext;
