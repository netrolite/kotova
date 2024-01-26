import AvatarWithFallback from "@/components/AvatarWithFallback";
import PageTitle from "@/components/PageTitle";
import TestResultAnswers from "@/components/testResult/Answers";
import { dateFormatterDefaults, timeFormatterDefaults } from "@/lib/constants";
import TestResultContextProvider from "@/lib/contexts/testResult/Index/Provider";
import getTestResult from "@/lib/fetchers/testResults/getTestResults";
import Link from "next/link";
import { notFound } from "next/navigation";

type Context = {
  params: { id: string };
};

export default async function TestResult({
  params: { id: testResultId },
}: Context) {
  const testResult = await getTestResult(testResultId);
  if (!testResult) notFound();

  const createdAtDateString = new Date(
    testResult.test.createdAt,
  ).toLocaleDateString("ru", dateFormatterDefaults);
  const createdAtTimeString = new Date(
    testResult.test.createdAt,
  ).toLocaleTimeString("ru", timeFormatterDefaults);

  return (
    <TestResultContextProvider {...testResult}>
      <div className="mb-8 space-y-2">
        <div>
          <PageTitle>
            Результаты теста{" "}
            <Link
              className="hover:underline"
              href={`/take-test/${testResult.test.id}`}
            >
              {testResult?.test?.name}
            </Link>
          </PageTitle>
          <Link
            href={`/subjects/${testResult.test.subject?.id}`}
            className="hover:underline"
          >
            <h2 className="text-muted-foreground">
              {testResult.test?.subject?.title}
            </h2>
          </Link>
        </div>

        <div className="flex flex-col">
          <p className="text-muted-foreground">
            Пройден пользователем{" "}
            <Link
              className="font-semibold text-black hover:underline"
              href={`/users/${testResult.userId ?? "deleteduser"}`}
            >
              {testResult.user?.name}
            </Link>{" "}
            {createdAtDateString} в {createdAtTimeString}
          </p>
        </div>
      </div>
      <TestResultAnswers />
    </TestResultContextProvider>
  );
}
