import { TakeTestGetTestReturn } from "@/lib/fetchers/takeTest/getTest";
import { createContext } from "react";

export type TakeTestContextType = Exclude<Awaited<TakeTestGetTestReturn>, null>;

const TakeTestContext = createContext<TakeTestContextType | null>(null);
export default TakeTestContext;
