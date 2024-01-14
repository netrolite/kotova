"use client";

import UserTestResultContext from "@/lib/contexts/user/testResults/testResult";
import { UsersGetUserTestResultsReturn } from "@/lib/fetchers/users/getUserTestResults";
import UserTestResult from "./Result/Index";

type Props = UsersGetUserTestResultsReturn;

export default async function UserTestResults({ testResults, ...user }: Props) {
  if (!testResults.length)
    return (
      <p className="text-muted-foreground">
        Пользователь {user.name} ещё не прошел ни одного теста
      </p>
    );

  return (
    <ul className="space-y-6">
      {testResults.map((testResult) => (
        <UserTestResultContext.Provider key={testResult.id} value={testResult}>
          <UserTestResult />
        </UserTestResultContext.Provider>
      ))}
    </ul>
  );
}
