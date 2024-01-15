import { UserProfileGetRecentTestResultsReturn } from "@/lib/fetchers/userProfile/getRecentTestResults";
import { createContext } from "react";

export type UserProfileTestResultContextType =
  UserProfileGetRecentTestResultsReturn["testResults"][number];

const UserProfileTestResultContext =
  createContext<UserProfileTestResultContextType | null>(null);

export default UserProfileTestResultContext;
