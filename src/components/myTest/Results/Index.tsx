"use client";

import { GENERIC_ERROR_MSG } from "@/lib/constants";
import useMyTestContext from "@/lib/contexts/myTest/useContext";
import Loading from "../../Loading/Loading";
import MyTestResult from "./Result";
import useMyTestResultsSwr from "@/lib/hooks/swr/myTestResults";

export default function MyTestResults() {
  const { testResults: initTestResults } = useMyTestContext();
  const { data: users, isValidating, error } = useMyTestResultsSwr();

  if (isValidating) return <Loading />;
  if (error) return <p>{GENERIC_ERROR_MSG}</p>;
  if (!users?.length && !initTestResults.length) {
    return <p>Этот тест ещё ни разу не был пройден</p>;
  }
  if (!users?.length) return <p>По вашему запросу не нашлось результатов</p>;

  return (
    <ul>
      {users.map((user) => (
        <MyTestResult key={user.id} {...user} />
      ))}
    </ul>
  );
}
