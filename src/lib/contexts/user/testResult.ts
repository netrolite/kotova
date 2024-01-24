import { UserProfileGetRecentTestResultsReturn } from "@/lib/fetchers/userProfile/getUser";
import { createContext } from "react";

export type UserProfileTestResultContextType =
  UserProfileGetRecentTestResultsReturn["testResults"][number];

const UserProfileTestResultContext =
  createContext<UserProfileTestResultContextType | null>(null);

export default UserProfileTestResultContext;
