import { Test, TestResult, User } from "@prisma/client";

type Props = {
  user: User;
  testResults: (TestResult & { test: Test })[];
};
export default async function UserTestResults({ user, testResults }: Props) {
  if (!testResults.length)
    return (
      <p className="text-muted-foreground">
        Пользователь {user.name} ещё не прошел ни одного теста
      </p>
    );

  return (
    <ul>
      {testResults.map((result) => (
        <li key={result.id}>
          <h3>{result.test.name}</h3>
          {/* TODO: add subjects and grades */}
          <div>
            <span>Баллы:</span>
            <span>
              {result.score}/{result.test.maxScore} ({result.scorePercentage}%)
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
