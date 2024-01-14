import { UsersGetUserTestResultsReturn } from "@/lib/fetchers/users/getUserTestResults";
import { createContext } from "react";

export type UserTestResultContextType =
  UsersGetUserTestResultsReturn["testResults"][number];

const UserTestResultContext = createContext<UserTestResultContextType | null>(
  null,
);

export default UserTestResultContext;
