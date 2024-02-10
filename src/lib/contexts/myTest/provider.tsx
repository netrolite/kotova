"use client";

import { ReactNode, useState } from "react";
import MyTestContext from ".";
import { useSearchParams } from "next/navigation";
import { MyTestGetTestReturn } from "@/lib/fetchers/myTest/getTest";
import { MyTestGetTestResultsReturn } from "@/lib/fetchers/myTest/getTestResults";

type Props = {
  children: ReactNode;
  test: MyTestGetTestReturn;
  testResults: MyTestGetTestResultsReturn;
};

export default function MyTestContextProvider(props: Props) {
  const initSearchParams = useSearchParams();
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(initSearchParams),
  );
  return (
    <MyTestContext.Provider
      value={{ ...props, initSearchParams, searchParams, setSearchParams }}
    >
      {props.children}
    </MyTestContext.Provider>
  );
}
