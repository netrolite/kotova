import { MyTestGetTestReturn } from "@/lib/fetchers/myTest/getTest";
import { createContext } from "react";

export type MyTestContextType = MyTestGetTestReturn;
const MyTestContext = createContext<MyTestContextType | null>(null);
export default MyTestContext;
