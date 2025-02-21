"use client";

import { TestResultGetTestResultReturn } from "@/lib/fetchers/testResults/getTestResults";
import { PropsWithChildren } from "react";
import { TestResultContext } from "./Index";
import { User } from "@prisma/client";

type Props = PropsWithChildren<
  TestResultGetTestResultReturn & {
    signedInUser: User | null;
  }
>;

export default function TestResultContextProvider(props: Props) {
  return (
    <TestResultContext.Provider value={props}>
      {props.children}
    </TestResultContext.Provider>
  );
}
