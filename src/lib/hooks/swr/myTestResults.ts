import { swrKeys } from "@/lib/constants";
import useMyTestContext from "@/lib/contexts/myTest/useContext";
import getApiData from "@/lib/fetchers/getApiData";
import { MyTestGetTestResultsReturn } from "@/lib/fetchers/myTest/getTestResults";
import useSWR, { unstable_serialize } from "swr";

export default function useMyTestResultsSwr() {
  const {
    test: { id: testId },
    searchParams,
  } = useMyTestContext();
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
