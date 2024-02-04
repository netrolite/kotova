import { swrKeys } from "@/lib/constants";
import getApiData from "@/lib/fetchers/getApiData";
import { MyTestGetTestResultsReturn } from "@/lib/fetchers/myTest/getTestResults";
import useSWR, { unstable_serialize } from "swr";

type Params = {
  testId: string;
  searchParams?: URLSearchParams;
};

export default function useMyTestResultsSwr({ testId, searchParams }: Params) {
  return useSWR<MyTestGetTestResultsReturn>(
    unstable_serialize([swrKeys.myTest, testId]),
    () =>
      getApiData(
        `/api/test-results/${testId}?${
          searchParams ? searchParams.toString() : ""
        }`,
      ),
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    },
  );
}
