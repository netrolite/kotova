import { TestResultGetTestResultReturn } from "@/lib/fetchers/testResults/getTestResults";
import { createContext } from "react";

export const TestResultContext =
  createContext<TestResultGetTestResultReturn | null>(null);
