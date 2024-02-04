"use client";

import { swrKeys } from "@/lib/constants";
import getApiData from "@/lib/fetchers/getApiData";
import { Subject } from "@prisma/client";
import useSWR from "swr";

export default function useSubjectsSwr() {
  return useSWR<Subject[]>([swrKeys.subjects], getApiData);
}
