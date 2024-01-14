"use client";

import { TestResultGetTestResultReturn } from "@/lib/fetchers/testResults/getTestResults";
import { PropsWithChildren } from "react";
import { TestResultContext } from "./Index";

type Props = PropsWithChildren<TestResultGetTestResultReturn>;

export default function TestResultContextProvider(props: Props) {
  return (
    <TestResultContext.Provider value={props}>
      {props.children}
    </TestResultContext.Provider>
  );
}
