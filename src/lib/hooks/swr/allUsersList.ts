"use client";

import allUsersGetKey from "@/lib/fetchers/allUsers/getKey";
import { GetUsersReturn } from "@/lib/fetchers/allUsers/getUsers";
import getApiData from "@/lib/fetchers/getApiData";
import useAllUsersStore from "@/lib/stores/allUsers";
import useSWRInfinite from "swr/infinite";

export default function useAllUsersListSwr() {
  const query = useAllUsersStore((s) => s.query);
  return useSWRInfinite(
    (...args) => allUsersGetKey(...args, { query }),
    (key) => getApiData<GetUsersReturn>(key),
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
}
