"use client";

import { ReactNode } from "react";
import TestResultAnswerContext, { TestResultAnswerContextType } from "./index";

type Props = {
  children: ReactNode;
  answer: TestResultAnswerContextType;
};

export default function TestResultAnswerContextProvider({
  children,
  answer,
}: Props) {
  return (
    <TestResultAnswerContext.Provider value={answer}>
      {children}
    </TestResultAnswerContext.Provider>
  );
}
