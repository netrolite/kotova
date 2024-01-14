import { TestResultGetTestResultReturn } from "@/lib/fetchers/testResults/getTestResults";
import { createContext } from "react";

export type TestResultAnswerContextType =
  TestResultGetTestResultReturn["answers"][number];

export const TestResultAnswerContext =
  createContext<TestResultAnswerContextType | null>(null);
