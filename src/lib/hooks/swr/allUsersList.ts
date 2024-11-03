"use client";

import { swrKeys } from "@/lib/constants";
import getApiData from "@/lib/fetchers/getApiData";
import { User } from "@prisma/client";
import useSWR from "swr";

export default function useAllUsersListSwr() {
  return useSWR<User[]>([swrKeys.allUsers], getApiData);
}
