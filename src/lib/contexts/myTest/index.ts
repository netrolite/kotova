import { Test } from "@prisma/client";
import { createContext } from "react";

export type MyTestContextType = Test;
const MyTestContext = createContext<MyTestContextType | null>(null);
export default MyTestContext;
