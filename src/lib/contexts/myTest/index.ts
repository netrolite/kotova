import { MyTestGetTestReturn } from "@/lib/fetchers/myTest/getTest";
import { MyTestGetTestResultsReturn } from "@/lib/fetchers/myTest/getTestResults";
import { createContext } from "react";

export type MyTestContextType = {
  test: MyTestGetTestReturn;
  testResults: MyTestGetTestResultsReturn;
};
const MyTestContext = createContext<MyTestContextType | null>(null);
export default MyTestContext;
