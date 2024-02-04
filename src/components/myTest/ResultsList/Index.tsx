"use client";

import { GENERIC_ERROR_MSG, swrKeys } from "@/lib/constants";
import useMyTestContext from "@/lib/contexts/myTest/useContext";
import useSWR from "swr";
import Loading from "../../Loading/Loading";
import { MyTestGetTestResultsReturn } from "@/lib/fetchers/myTest/getTestResults";
import MyTestResult from "./Result";

export default function MyTestResults() {
  const { id: testId, testResults: initTestResults } = useMyTestContext();
  const {
    data: users,
    isValidating,
    error,
  } = useSWR<MyTestGetTestResultsReturn>([swrKeys.myTest, testId]);

  if (isValidating) return <Loading />;
  if (error) return <p>{GENERIC_ERROR_MSG}</p>;
  if (!users?.length && !initTestResults.length) {
    return <p>Этот тест ещё ни разу не был пройден</p>;
  }
  if (!users?.length) return <p>По вашему запросу не нашлось результатов</p>;

  return (
    <ul>
      {users.map((user) => (
        <MyTestResult {...user} />
      ))}
    </ul>
  );
}
