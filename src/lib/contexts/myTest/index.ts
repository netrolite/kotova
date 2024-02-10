import { MyTestGetTestReturn } from "@/lib/fetchers/myTest/getTest";
import { MyTestGetTestResultsReturn } from "@/lib/fetchers/myTest/getTestResults";
import ReactStateSetter from "@/lib/types/SetState";
import { ReadonlyURLSearchParams } from "next/navigation";
import { createContext } from "react";
import { URLSearchParams } from "url";

export type MyTestContextType = {
  test: MyTestGetTestReturn;
  testResults: MyTestGetTestResultsReturn;
  initSearchParams: ReadonlyURLSearchParams;
  searchParams: URLSearchParams;
  setSearchParams: ReactStateSetter<URLSearchParams>;
};
const MyTestContext = createContext<MyTestContextType | null>(null);
export default MyTestContext;
