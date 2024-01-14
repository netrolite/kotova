"use client";

import { User } from "@prisma/client";
import { ReactNode, createContext } from "react";

export type UserContextType = {
  signedInUser: (User & { testResults: { testId: string }[] }) | null;
  user: User;
};

export const UserContext = createContext<UserContextType | null>(null);

export default function UserContextProvider({
  children,
  ...value
}: UserContextType & { children: ReactNode }) {
  return <UserContext.Provider {...{ value }}>{children}</UserContext.Provider>;
}
