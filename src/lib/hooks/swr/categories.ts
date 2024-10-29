"use client";

import { swrKeys } from "@/lib/constants";
import getApiData from "@/lib/fetchers/getApiData";
import { Category } from "@prisma/client";
import useSWR from "swr";

export default function useCategoriesSwr() {
  return useSWR<Category[]>([swrKeys.categories], getApiData);
}
