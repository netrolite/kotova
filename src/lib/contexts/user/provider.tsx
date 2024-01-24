"use client";

import { UserProfileGetRecentTestResultsReturn } from "@/lib/fetchers/userProfile/getUser";
import { User } from "@prisma/client";
import { ReactNode, createContext } from "react";

export type UserProfileContextType = {
  signedInUser: (User & { testResults: { testId: string }[] }) | null;
  user: UserProfileGetRecentTestResultsReturn;
  userId: string;
};

export const UserProfileContext = createContext<UserProfileContextType | null>(
  null,
);

export default function UserProfileContextProvider({
  children,
  ...value
}: UserProfileContextType & { children: ReactNode }) {
  return (
    <UserProfileContext.Provider {...{ value }}>
      {children}
    </UserProfileContext.Provider>
  );
}
