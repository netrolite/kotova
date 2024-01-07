"use client";

import getApiData from "@/lib/fetchers/getApiData";
import { Subject } from "@prisma/client";
import useSWR from "swr";

export default function useSubjectsSwr() {
  return useSWR<Subject[]>(["/api/subjects"], getApiData);
}
