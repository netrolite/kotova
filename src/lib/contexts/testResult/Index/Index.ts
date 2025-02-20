import { TestResultGetTestResultReturn } from "@/lib/fetchers/testResults/getTestResults";
import { User } from "@prisma/client";
import { createContext } from "react";

export const TestResultContext = createContext<
  (TestResultGetTestResultReturn & { signedInUser: User | null }) | null
>(null);
